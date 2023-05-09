const languageData = require('../models/languages.js');
const { detectLanguage } = require('../utils/languageCognitive.js');
const { entityRecognition } = require('../utils/languageCognitive.js');
const { entityLinking } = require('../utils/languageCognitive.js');
const { piiDetection } = require('../utils/languageCognitive.js');
const createError = require('../middlewares/error.js');


exports.namedResult = async (req, res, next) => {
    try {
        const textInput = [req.body.sendText];
        if (!textInput[0]) {
            const error = createError('Please provide an input', 400);
            return res.status(error.status).json({ message: error.message, status: error.status });
        }

        const isoCode = await detectLanguage(textInput);
        let isLanguageSupported = false;

        for (const languageCode in languageData.entity) {
            if (languageCode === isoCode) {
                isLanguageSupported = true;
                const textDocumentInputs = [
                { id: "1", language:isoCode, text:textInput[0] },
                ];
                const results = await entityRecognition(textDocumentInputs);
                res.status(200).send(results);
            }
        } 
        
        if (!isLanguageSupported) {
            const error = createError('Language not supported', 400);
            return res.status(error.status).json({ message: error.message, status: error.status });
        }

    } catch (error) {
        return res.status(error.status).json({ message: error.message, status: error.status });
    }
}

exports.languagesNamed = (req, res) => {
    const results = languageData.entity;
    res.status(200).send(results);
};

exports.linkingResult = async (req, res, next) => {
    try {
        const textInput = [req.body.sendText];
        if (!textInput[0]) {
            const error = createError('Please provide an input', 400);
            return res.status(error.status).json({ message: error.message, status: error.status });
        }

        const isoCode = await detectLanguage(textInput);
        let isLanguageSupported = false;

        for (const languageCode in languageData.linking) {
            if (languageCode === isoCode) {
                isLanguageSupported = true;
                const textDocumentInputs = [
                { id: "1", language:isoCode, text:textInput[0] },
                ];
                const results = await entityLinking(textDocumentInputs);
                res.status(200).send(results);
            }
        } 
    
        if (!isLanguageSupported) {
            const error = createError('Language not supported', 400);
            return res.status(error.status).json({ message: error.message, status: error.status });
        }

    } catch (error) {
        return res.status(error.status).json({ message: error.message, status: error.status });
    }
};

exports.languagesLinking = (req, res) => {
    const results = languageData.linking;
    res.status(200).send(results);
};

exports.piiResult = async (req, res, next) => {
    try {
        const textInput = [req.body.sendText];
        if (!textInput[0]) {
            const error = createError('Please provide an input', 400);
            return res.status(error.status).json({ message: error.message, status: error.status });
        }
        
        const isoCode = await detectLanguage(textInput);
        let isLanguageSupported = false;

        for (const languageCode in languageData.pii) {
            if (languageCode === isoCode) {
                isLanguageSupported = true;
                const textDocumentInputs = [
                { id: "1", language:isoCode, text:textInput[0] },
                ];
                const results = await piiDetection(textDocumentInputs);
                res.status(200).send(results);
            }
        }
        if (!isLanguageSupported) {
            const error = createError('Language not supported', 400);
            return res.status(error.status).json({ message: error.message, status: error.status });
        }
    } catch (error) {
        return res.status(error.status).json({ message: error.message, status: error.status });
    }
}

exports.languagesPII = (req, res) => {
    const results = languageData.pii;
    res.status(200).send(results);
};