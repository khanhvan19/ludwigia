const jwt = require("jsonwebtoken");

exports.generateAccessToken = (data) => {
    return jwt.sign(
        { id: data._id },
        process.env.JWT_ACCESS_SECRET_KEY,
        { expiresIn: "30s" }
    );
}

exports.generateRefreshToken = (data) => {
    return jwt.sign(
        { id: data._id },
        process.env.JWT_REFRESH_SECRET_KEY,
        { expiresIn: "7d" }
    );
}
