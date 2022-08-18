const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createProducer = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    logo: Joi.string(),
    dateOfFoundation: Joi.date(),
    description: Joi.string(),
    headquarter: Joi.string(),
    site: Joi.string().uri(),
    scenes: Joi.array(),
  }),
};

const getProducers = {
  query: Joi.object().keys({
    name: Joi.string(),
    dateOfFoundation: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getProducer = {
  params: Joi.object().keys({
    producerId: Joi.string().custom(objectId),
  }),
};

const updateProducer = {
  params: Joi.object().keys({
    producerId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      name: Joi.string(),
      logo: Joi.string(),
      dateOfFoundation: Joi.date(),
      description: Joi.string(),
      headquarter: Joi.string(),
      site: Joi.string().uri(),
      scenes: Joi.array(),
    })
    .min(1),
};

const deleteProducer = {
  params: Joi.object().keys({
    producerId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createProducer,
  getProducers,
  getProducer,
  updateProducer,
  deleteProducer,
};
