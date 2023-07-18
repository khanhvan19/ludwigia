const express = require('express');
const adminController = require('../controllers/admin.controller')
const router = express.Router();

const { uploadAdminAvatar } = require('../middlewares/imageUploader')
const { verifyAccessToken } = require('../middlewares/verifyToken')

router.route('/register')
    .post(
        verifyAccessToken,
        uploadAdminAvatar.single('avatar'),
        adminController.register
    );

router.route('/login')
    .post(adminController.login)
    .get(adminController.logout);
    
router.route('/refresh')
    .post(adminController.requestRefreshToken)
    

module.exports = router;
