const { languageClient } = require('../config/config');

async function detectLanguage(textInput) {
    const languageUsed = await languageClient.analyze("LanguageDetection", textInput);
    const isoCode = (languageUsed[0].primaryLanguage.iso6391Name === '(Unknown)') ? 'en' : languageUsed[0].primaryLanguage.iso6391Name;
    return isoCode;
}

async function entityRecognition(textDocumentInputs) {
    const results = await languageClient.analyze("EntityRecognition", textDocumentInputs);
    return results;
}

async function entityLinking(textDocumentInputs) {
    const results = await languageClient.analyze("EntityLinking", textDocumentInputs);
    return results;
}

async function piiDetection(textDocumentInputs) {
    const results = await languageClient.analyze("PiiEntityRecognition", textDocumentInputs);
    return results;
}


module.exports = {
    detectLanguage,
    entityRecognition,
    entityLinking,
    piiDetection,
};
