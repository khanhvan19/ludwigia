const AdminModel = require('../models/Admin')
const ApiError = require('../middlewares/errorHandler');
const jwtUtils = require('../utils/token')

const cloudinary = require('cloudinary').v2;
const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs');


exports.register = async (req, res, next) => {
    const fileData = req.file;

    try {
        const isExist = await AdminModel.findOne({ email: req.body.email })
        if (isExist) {
            if(fileData) cloudinary.uploader.destroy(fileData?.filename);
            return next(
                new ApiError(409, "Email đã có tài khoản trên hệ thống!")
            );
        }

        if(fileData) {
            req.body.avatar = {
                link: fileData?.path,
                path: fileData?.filename
            }
        } else delete req.body.avatar;
        
        await AdminModel.create({
            ...req.body, 
            status: true 
        });
        res.status(200).json({
            message: "Thêm mới Quản trị viên thành công!"
        })
    } catch (error) {
        if(fileData) cloudinary.uploader.destroy(fileData?.filename);
        return next(
            new ApiError(500, "Server could not process the request")
        );
    }
}

exports.login = async (req, res, next) => {
    try {
        const admin = await AdminModel.findOne({ email: req.body.email });
        if (!admin) {
            return next( new ApiError(404, "Không tìm thấy tài khoản trên hệ thống!"));
        }
        const validPass = await bcrypt.compareSync(req.body.password, admin.password);
        if (!validPass) {
            return next( new ApiError(404, "Nhập mật khẩu không chính xác!"));
        }
        if(admin && validPass) {
            const accessToken = jwtUtils.generateAccessToken(admin);
            const refreshToken = jwtUtils.generateRefreshToken(admin);
            res.cookie('refreshToken', refreshToken, {
                maxAge: 7 * 24 * 60 * 60 * 1000,
                httpOnly: true,
                secure: false,
                path: '/',
                sameSite: 'lax',
            });
            const { password, ...others } = admin._doc;

            res.status(200).json({ ...others, accessToken });
        }
    } catch (error) {
        return next(
            new ApiError(500, "Server could not process the request")
        );
    }
}

exports.logout = async (req, res, next) => {
    try {
        await res.clearCookie('refreshToken', {path: '/'});
        res.status(200).json({
            message: "Đăng xuất thành công!" 
        });
    } catch (err) {
        return next(
            new ApiError(500, "Server could not process the request")
        );
    }
}

exports.requestRefreshToken = async (req, res, next) => {
    try {
        const refreshToken = req.cookies.refreshToken;
        if (!refreshToken) return next(
            new ApiError(403, "Phiên đăng nhập hết hạn!")
        ); 
        jwt.verify(
            refreshToken, 
            process.env.JWT_REFRESH_SECRET_KEY, 
            (err, decode) => {
                if(err) return next(
                    new ApiError(403, "Phiên đăng nhập hết hạn!")
                );
                const newAccessToken = jwtUtils.generateAccessToken(req.body);
                res.status(200).send(newAccessToken);
            }
        );
    } catch (error) {
        return next(
            new ApiError(500, "Server could not process the request")
        );
    }
}