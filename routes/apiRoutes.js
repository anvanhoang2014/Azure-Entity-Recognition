const express = require('express');
const controller = require('../controllers/apiController');

const router = express.Router();

router.post('/named', controller.namedResult);

router.get('/named/languages', controller.languagesNamed);

router.post('/linking', controller.linkingResult);

router.get('/linking/languages', controller.languagesLinking);

router.post('/pii', controller.piiResult);

router.get('/pii/languages', controller.languagesPII);


module.exports = router;