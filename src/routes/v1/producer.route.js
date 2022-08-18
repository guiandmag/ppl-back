const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const { producerValidation } = require('../../validations');
const { producerController } = require('../../controllers');

const router = express.Router();

router
  .route('/')
  .post(auth('manageUsers'), validate(producerValidation.createProducer), producerController.createProducer)
  .get(auth('getUsers'), validate(producerValidation.getProducers), producerController.getProducers);

router
  .route('/:producerId')
  .get(auth('getUsers'), validate(producerValidation.getProducer), producerController.getProducer)
  .patch(auth('manageUsers'), validate(producerValidation.updateProducer), producerController.updateProducer)
  .delete(auth('manageUsers'), validate(producerValidation.deleteProducer), producerController.deleteProducer);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Producer
 *   description: Producer management and retrieval
 */

/**
 * @swagger
 * /producer:
 *   post:
 *     summary: Create a producer
 *     description: Any user can create producers.
 *     tags: [Producer]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - logo
 *               - dateOfFoundation
 *               - site
 *             properties:
 *               name:
 *                 type: string
 *               logo:
 *                 type: string
 *                 format: binary
 *               dateOfFoundation:
 *                 type: string
 *                 format: date
 *               description:
 *                  type: string
 *               headquarter:
 *                  type: string
 *               site:
 *                  type: string
 *                  format: uri
 *               scenes:
 *                  type: array
 *                  items:
 *                    type: object
 *                    properties:
 *                      id:
 *                        type: string
 *             example:
 *               name: fake artist name
 *               dateOfFoundation: 1985-04-12T23:20:50.52Z
 *               description: The best producer of all
 *               headquarter: SP - Brazil
 *               site: https://www.bestproducer.com
 *               scenes:
 *                 - id: 5ebac534954b54139806c522
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Producer'
 *       "400":
 *         $ref: '#/components/responses/BadRequest'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *
 *   get:
 *     summary: Get all producers'
 *     description: All users can retrieve producers.
 *     tags: [Producer]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: Producer name
 *       - in: query
 *         name: birthPlace
 *         schema:
 *           type: string
 *         description: Producer place of birth
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *         description: sort by query in the form of field:desc/asc (ex. name:asc)
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *         default: 10
 *         description: Maximum number of producers
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Page number
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 results:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Producer'
 *                 page:
 *                   type: integer
 *                   example: 1
 *                 limit:
 *                   type: integer
 *                   example: 10
 *                 totalPages:
 *                   type: integer
 *                   example: 1
 *                 totalResults:
 *                   type: integer
 *                   example: 1
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 */

/**
 * @swagger
 * /producer/{id}:
 *   get:
 *     summary: Get a producer
 *     description: Users can fetch information about producer
 *     tags: [Producer]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Producer id
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Producer'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   patch:
 *     summary: Update a producer
 *     description: Users can update information about producer.
 *     tags: [Producer]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Producer id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               logo:
 *                 type: string
 *               dateOfFoundation:
 *                 type: string
 *               description:
 *                 type: string
 *               headquarter:
 *                 type: string
 *             example:
 *               name: fake name
 *               logo: /usr/photo/new
 *               dateOfFoundation: 1986-04-12T23:20:50.52Z
 *               description: Very good
 *               headquarter: RJ - Brazil
 *               site: https://www.bestproducer.com
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Producer'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   delete:
 *     summary: Delete a producer
 *     description: Users can delete producer.
 *     tags: [Producer]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Producer id
 *     responses:
 *       "200":
 *         description: No content
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */
