const express = require('express');
const speciesController = require('../controllers/species.controller')
const router = express.Router();

const { verifyAccessToken } = require('../middlewares/verifyToken')

// router.route('/')
//     .post(verifyAccessToken, speciesController.createNew);

// router.route('/search')
//     .get(speciesController.getResultSearch);

// router.route('/admin-search')
//     .get(verifyAccessToken, speciesController.getAdminResultSearch);

// router.route('/:id')
//     .put(verifyAccessToken, speciesController.updateOne)
//     .delete(verifyAccessToken, speciesController.deleteOne);

// router.route('/toggle-status/:id')
//     .put(verifyAccessToken, speciesController.toggleStatus);

module.exports = router;
