const { languageClient } = require ('../config/config');
const languageData = require('../models/languages.js');
const { detectLanguage } = require('../utils/languageCognitive.js');
const { entityRecognition } = require('../utils/languageCognitive.js');
const { entityLinking } = require('../utils/languageCognitive.js');
const { piiDetection } = require('../utils/languageCognitive.js');
const createError = require('../middlewares/error.js');


exports.newNamed = (req, res) => {
    return res.render('./namedEntityRecognition/entityRecognition');
};

exports.namedResult = async (req, res, next) => {
  try {
    const textInput = [req.body.sendText];
    if (!textInput[0]) {
      const error = createError('Please provide an input', 400);
      return next(error);
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
        res.status(200).render('./namedEntityRecognition/result', { result: results, text: textInput });
      }
    } 
  
    if (!isLanguageSupported) {
      const error = createError('Language not supported', 500);
      return next(error);
    }

  } catch (err) {
    next(err);
  }
}

exports.languagesNamed = (req, res) => {
  return res.render('./namedEntityRecognition/languages' , {languages: languageData});
};

exports.newLinking = (req, res) => {
  return res.render('./entityLinking/entityLinking');
};

exports.linkingResult = async (req, res, next) => {
  try {
    const textInput = [req.body.sendText];
    if (!textInput[0]) {
      const error = createError('Please provide an input', 400);
      return next(error);
    }

    const isoCode = await detectLanguage(textInput);
    let isLanguageSupported = false;

    for (const languageCode in languageData.pii) {
      if (languageCode === isoCode) {
        isLanguageSupported = true;
        const textDocumentInputs = [
          { id: "1", language:isoCode, text:textInput[0] },
        ];
        const results = await entityLinking(textDocumentInputs);
        res.status(200).render('./entityLinking/result', { result: results, text: textInput});
      }
    } 
  
    if (!isLanguageSupported) {
      const error = createError('Language not supported', 400);
      return next(error);
    }

  } catch (err) {
    next(err);
  }
};

exports.languagesLinking = (req, res) => {
  return res.render('./entityLinking/languages' , {languages: languageData});
};

exports.newPII = (req, res) => {
  return res.render('./piiDetection/piiDetection');
};

exports.piiResult = async (req, res, next) => {
  try {
    const textInput = [req.body.sendText];
    if (!textInput[0]) {
      const error = createError('Please provide an input', 400);
      return next(error);
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
        res.status(200).render('./piiDetection/result', { result: results, text: textInput});
      }
    }
    if (!isLanguageSupported) {
      const error = createError('Language not supported', 500);
      return next(error);
    }
  } catch (err) {
    next(err);
  }
}

exports.languagesPII = (req, res) => {
  return res.render('./piiDetection/languages' , {languages: languageData});
};