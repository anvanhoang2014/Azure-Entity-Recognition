const express = require('express');
const controller = require('../controllers/entityController');

const router = express.Router();

router.get('/named', controller.newNamed);

router.post('/named', controller.namedResult);

router.get('/named/languages', controller.languagesNamed);

router.get('/linking', controller.newLinking);

router.post('/linking', controller.linkingResult);

router.get('/linking/languages', controller.languagesLinking);

router.get('/pii', controller.newPII);

router.post('/pii', controller.piiResult);

router.get('/pii/languages', controller.languagesPII);


module.exports = router;