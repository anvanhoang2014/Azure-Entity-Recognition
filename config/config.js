require('dotenv').config({ path: './config/.env'});

const { TextAnalysisClient, AzureKeyCredential } = require('@azure/ai-language-text');

const endpoint = process.env['ENDPOINT'] || '<cognitive services endpoint>';
const apiKey = process.env['TEXT_ANALYTICS_API_KEY'] || '<api key>';

const languageClient = new TextAnalysisClient(endpoint, new AzureKeyCredential(apiKey));

module.exports = {
    languageClient
};