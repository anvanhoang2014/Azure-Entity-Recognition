/**
 * @swagger
 * components:
 *   schemas:
 *     LanguageData:
 *       type: object
 *       properties:
 *         code:
 *           type: string
 *           description: The ISO 639-1 language code.
 *         name:
 *           type: string
 *           description: The name of the language.
 *     NamedEntity:
 *       type: object
 *       properties:
 *         text:
 *           type: string
 *           description: The identified named entity text
 *         category:
 *           type: string
 *           description: The category of the named entity
 *         offset:
 *           type: integer
 *           description: The offset of the named entity in the input text
 *         length:
 *           type: integer
 *           description: The length of the named entity in the input text
 *         confidenceScore:
 *           type: number
 *           format: float
 *           description: The confidence score of the identified named entity
 * 
 *     NamedEntityRecognitionResult:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The ID of the recognition result
 *         warnings:
 *           type: array
 *           items:
 *             type: string
 *             description: The warnings that occurred during the recognition
 *         entities:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/NamedEntity'
 *     PiiDetectionResult:
 *       type: array
 *       items:
 *         type: object
 *         properties:
 *           id:
 *             type: string
 *             description: Unique identifier for the result
 *           warnings:
 *             type: array
 *             items:
 *               type: string
 *             description: List of warnings, if any
 *           redactedText:
 *             type: string
 *             description: The input text with redaction applied to identified sensitive information
 *           entities:
 *             type: array
 *             items:
 *               type: object
 *               properties:
 *                 text:
 *                   type: string
 *                   description: The identified sensitive information
 *                 category:
 *                   type: string
 *                   description: The type of sensitive information detected
 *                 offset:
 *                   type: integer
 *                   description: The starting index of the identified sensitive information in the input text
 *                 length:
 *                   type: integer
 *                   description: The length of the identified sensitive information in the input text
 *                 confidenceScore:
 *                   type: number
 *                   description: A value between 0 and 1 representing the model's confidence in the detection
 *         example:
 *           - id: "1"
 *             warnings: []
 *             redactedText: "********** and ************* got a divorce"
 *             entities:
 *               - text: "Bill Gates"
 *                 category: "Person"
 *                 offset: 0
 *                 length: 10
 *                 confidenceScore: 0.99
 *               - text: "Melinda Gates"
 *                 category: "Person"
 *                 offset: 15
 *                 length: 13
 *                 confidenceScore: 0.98
 * 
 * tags:
 *   - name: Named Entity Recognition (NER)
 *     description: Operations for NER
 *   - name: Entity Linking
 *     description: Operations for entity linking
 *   - name: Personally Identifiable Information (PII) Detection
 *     description: Operations for PII detection
 * /api/named:
 *   post:
 *     summary: Returns named entity recognition results for the provided text
 *     tags:
 *       - Named Entity Recognition (NER)
 *     description: Uses Microsoft Azure Cognitive Services to detect named entities in the provided text.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               sendText:
 *                 type: string
 *                 description: The text to be analyzed for named entities
 *                 example: "Bill Gates and Melinda Gates got a divorce"
 *             required:
 *               - sendText
 *     responses:
 *       200:
 *         description: The named entity recognition results for the provided text
 *         content:
 *           application/json:
 *             schema:
 *             type: array
 *             items:
 *               $ref: '#/components/schemas/NamedEntityRecognitionResult'
 *             example:
 *               [
 *                 {
 *                   "id": "1",
 *                   "warnings": [],
 *                   "entities": [
 *                     {
 *                       "text": "Bill Gates",
 *                       "category": "Person",
 *                       "offset": 0,
 *                       "length": 10,
 *                       "confidenceScore": 1
 *                     },
 *                     {
 *                       "text": "Melinda Gates",
 *                       "category": "Person",
 *                       "offset": 15,
 *                       "length": 13,
 *                       "confidenceScore": 1
 *                     },
 *                     {
 *                       "text": "divorce",
 *                       "category": "Event",
 *                       "offset": 43,
 *                       "length": 7,
 *                       "confidenceScore": 0.65
 *                     }
 *                   ]
 *                 }
 *               ]
 *       400:
 *         description: Bad request, the sendText field is missing
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Please provide an input"
 *                 status:
 *                   type: number
 *                   example: 400
 *       404:
 *         description: Not found, the server cannot locate the requested URL
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "The server cannot locate /api/namedEntityRecognition"
 *                 status:
 *                   type: number
 *                   example: 404
 *       500:
 *         description: Internal server error, the language is not supported
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Internal Server Error"
 *                 status:
 *                   type: number
 *                   example: 500
 *
 * /api/named/languages:
 *   get:
 *     summary: Returns a list of named entity recognition supported languages
 *     tags:
 *       - Named Entity Recognition (NER)
 *     description: Returns a list of ISO 639-1 codes and their corresponding language names for named entity recognition.
 *     responses:
 *       200:
 *         description: A list of named entity recognition supported languages
 *         content:
 *           application/json:
 *             example:
 *               {
 *                 "en": {
 *                   "name": "English"
 *                 },
 *                 "ar": {
 *                   "name": "Arabic"
 *                 }
 *               }
 *             schema:
 *               type: object
 *               additionalProperties:
 *                 $ref: '#/components/schemas/LanguageData'
 * /api/linking:
 *   post:
 *     summary: Performs entity linking on input text
 *     tags:
 *       - Entity Linking
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               sendText:
 *                 type: string
 *                 description: The text to be analyzed for named entities
 *                 example: "Bill Gates and Melinda Gates got a divorce"
 *             required:
 *               - sendText
 *     responses:
 *       '200':
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: "1"
 *                   warnings:
 *                     type: array
 *                     items:
 *                       type: string
 *                     example: []
 *                   entities:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         name:
 *                           type: string
 *                           example: "Bill Gates"
 *                         matches:
 *                           type: array
 *                           items:
 *                             type: object
 *                             properties:
 *                               confidenceScore:
 *                                 type: number
 *                                 example: 0.14
 *                               text:
 *                                 type: string
 *                                 example: "Bill Gates"
 *                               offset:
 *                                 type: integer
 *                                 example: 0
 *                               length:
 *                                 type: integer
 *                                 example: 10
 *                         language:
 *                           type: string
 *                           example: "en"
 *                         dataSourceEntityId:
 *                           type: string
 *                           example: "Bill Gates"
 *                         url:
 *                           type: string
 *                           example: "https://en.wikipedia.org/wiki/Bill_Gates"
 *                         dataSource:
 *                           type: string
 *                           example: "Wikipedia"
 *                         bingEntitySearchApiId:
 *                           type: string
 *                           example: "0d47c987-0042-5576-15e8-97af601614fa"
 *         examples:
 *           "application/json":
 *             [
 *               {
 *                 "id": "1",
 *                 "warnings": ["Low confidence score for entity 'Bill Gates'"],
 *                 "entities": [
 *                   {
 *                     "name": "Bill Gates",
 *                     "matches": [
 *                       {
 *                         "confidenceScore": 0.14,
 *                         "text": "Bill Gates",
 *                         "offset": 0,
 *                         "length": 10
 *                       }
 *                     ],
 *                     "language": "en",
 *                     "dataSourceEntityId": "Bill Gates",
 *                     "url": "https://en.wikipedia.org/wiki/Bill_Gates",
 *                     "dataSource": "Wikipedia",
 *                     "bingEntitySearchApiId": "0d47c987-0042-5576-15e8-97af601614fa"
 *                   }
 *                 ]
 *               }
 *             ]
 * 
 *       400:
 *         description: Bad request, the sendText field is missing
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Please provide an input"
 *                 status:
 *                   type: number
 *                   example: 400
 *       404:
 *         description: Not found, the server cannot locate the requested URL
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "The server cannot locate /api/namedEntityRecognition"
 *                 status:
 *                   type: number
 *                   example: 404
 *       500:
 *         description: Internal server error, the language is not supported
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Internal Server Error"
 *                 status:
 *                   type: number
 *                   example: 500
 *
 * /api/linking/languages:
 *   get:
 *     summary: Returns a list of Entity Linking supported languages
 *     tags:
 *       - Entity Linking
 *     description: Returns a list of ISO 639-1 codes and their corresponding language names for named entity recognition.
 *     responses:
 *       200:
 *         description: A list of Entity Linking supported languages
 *         content:
 *           application/json:
 *             example:
 *               {
 *                 "en": {
 *                   "name": "English"
 *                 },
 *                 "ar": {
 *                   "name": "Arabic"
 *                 }
 *               }
 *             schema:
 *               type: object
 *               additionalProperties:
 *                 $ref: '#/components/schemas/LanguageData'
 * /api/pii:
 *   post:
 *     summary: Returns PII detection results for the provided text
 *     tags:
 *       - Personally Identifiable Information (PII) Detection
 *     description: Uses Microsoft Azure Cognitive Services to detect named entities in the provided text.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               sendText:
 *                 type: string
 *                 description: The text to be analyzed for named entities
 *                 example: "Bill Gates and Melinda Gates got a divorce"
 *             required:
 *               - sendText
 *     responses:
 *       200:
 *         description: The named entity recognition results for the provided text
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PiiDetectionResult'
 *       400:
 *         description: Bad request, the sendText field is missing
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Please provide an input"
 *                 status:
 *                   type: number
 *                   example: 400
 *       404:
 *         description: Not found, the server cannot locate the requested URL
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "The server cannot locate /api/namedEntityRecognition"
 *                 status:
 *                   type: number
 *                   example: 404
 *       500:
 *         description: Internal server error, the language is not supported
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Internal Server Error"
 *                 status:
 *                   type: number
 *                   example: 500
 *
 * /api/pii/languages:
 *   get:
 *     summary: Returns a list of PII detection supported languages
 *     tags:
 *       - Personally Identifiable Information (PII) Detection
 *     description: Returns a list of ISO 639-1 codes and their corresponding language names for named entity recognition.
 *     responses:
 *       200:
 *         description: A list of named entity recognition supported languages
 *         content:
 *           application/json:
 *             example:
 *               {
 *                 "en": {
 *                   "name": "English"
 *                 },
 *                 "ar": {
 *                   "name": "Arabic"
 *                 }
 *               }
 *             schema:
 *               type: object
 *               additionalProperties:
 *                 $ref: '#/components/schemas/LanguageData'
 */