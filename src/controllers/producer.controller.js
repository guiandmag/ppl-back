const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { producerService } = require('../services');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');

const createProducer = catchAsync(async (req, res) => {
  const producer = await producerService.createProducer(req.body);
  res.status(httpStatus.CREATED).send(producer);
});

const getProducers = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'birthPlace']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await producerService.queryProducers(filter, options);
  res.send(result);
});

const getProducer = catchAsync(async (req, res) => {
  const producer = await producerService.getProducerById(req.params.producerId);
  if (!producer) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Producer not found');
  }
  res.send(producer);
});

const updateProducer = catchAsync(async (req, res) => {
  const producer = await producerService.updateProducerById(req.params.producerId, req.body);
  res.send(producer);
});

const deleteProducer = catchAsync(async (req, res) => {
  await producerService.deleteProducerById(req.params.producerId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createProducer,
  getProducers,
  getProducer,
  updateProducer,
  deleteProducer,
};
