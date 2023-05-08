/**
 * @swagger
 * components:
 *   schemas:
 *     LanguageData:
 *       type: object
 *       properties:
 *         entity:
 *           type: object
 *           additionalProperties:
 *             type: array
 *             items:
 *               type: string
 *         supportedLanguages:
 *           type: array
 *           items:
 *             type: string
 *   responses:
 *     BadRequest:
 *       description: Bad request
 *     InternalServerError:
 *       description: Internal server error
 *     Success:
 *       description: Success
 * /entity/named:
 *   get:
 *     summary: Render the NER page
 *     responses:
 *       "200":
 *         description: Successfully rendered the page
 * /entity/named/result:
 *   post:
 *     summary: Get named entity recognition result
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               sendText:
 *                 type: string
 *                 example: "The capital of France is Paris."
 *     responses:
 *       "200":
 *         description: Success
 *         content:
 *           text/html:
 *             schema:
 *               type: string
 *       "400":
 *         $ref: '#/components/responses/BadRequest'
 *       "500":
 *         $ref: '#/components/responses/InternalServerError'
 * /entity/named/languages:
 *   get:
 *     summary: Get supported languages for named entity recognition
 *     responses:
 *       "200":
 *         description: Success
 *         content:
 *           text/html:
 *             schema:
 *               $ref: '#/components/schemas/LanguageData'
 */