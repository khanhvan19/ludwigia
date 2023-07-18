const express = require('express');
const genusController = require('../controllers/genus.controller')
const router = express.Router();

const { verifyAccessToken } = require('../middlewares/verifyToken')

router.route('/')
    .post(verifyAccessToken, genusController.createNew)
    .get(genusController.getAll);

router.route('/search')
    .get(genusController.getResultSearch);

router.route('/admin-search')
    .get(verifyAccessToken, genusController.getAdminResultSearch);

router.route('/:id')
    .put(verifyAccessToken, genusController.updateOne)
    .delete(verifyAccessToken, genusController.deleteOne);

router.route('/toggle-status/:id')
    .put(verifyAccessToken, genusController.toggleStatus);

module.exports = router;
