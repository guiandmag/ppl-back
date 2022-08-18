const httpStatus = require('http-status');
const { Producer } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a producer
 * @param producerBody
 * @returns {Promise<Producer>}
 */
const createProducer = async (producerBody) => {
  if (await Producer.findOne({ name: producerBody.name })) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Producer already exists');
  }
  return Producer.create(producerBody);
};

/**
 * Query for producers
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryProducers = async (filter, options) => {
  return Producer.paginate(filter, options);
};

/**
 * Get producer by id
 * @param {ObjectId} id
 * @returns {Promise<Producer>}
 */
const getProducerById = async (id) => {
  return Producer.findById(id);
};

/**
 * Get producer by name
 * @param {string} name
 * @returns {Promise<Producer>}
 */
const getProducerByName = async (name) => {
  return Producer.findOne({ name });
};

/**
 * Update producer by id
 * @param {ObjectId} producerId
 * @param {Object} updateBody
 * @returns {Promise<Producer>}
 */
const updateProducerById = async (producerId, updateBody) => {
  const producer = await getProducerById(producerId);
  if (!producer) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Producer not found');
  }

  Object.assign(producer, updateBody);
  await producer.save();
  return producer;
};

/**
 * Delete producer by id
 * @param {ObjectId} producerId
 * @returns {Promise<Producer>}
 */
const deleteProducerById = async (producerId) => {
  const producer = await getProducerById(producerId);
  if (!producer) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Producer not found');
  }
  await producer.remove();
  return producer;
};

module.exports = {
  createProducer,
  queryProducers,
  getProducerById,
  getProducerByName,
  updateProducerById,
  deleteProducerById,
};
