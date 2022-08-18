const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createArtist = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    photo: Joi.string(),
    dateOfBirth: Joi.date(),
    description: Joi.string(),
    birthPlace: Joi.string(),
    tags: Joi.array().items({
      hairColor: Joi.string().valid('Black', 'Redhead', 'Blonde'),
      bodyArt: Joi.string().valid('Piercings', 'Tattoos', 'None'),
      bodyType: Joi.string().valid(
        'Athletic',
        'Slim',
        'Average Body',
        'Muscular Man',
        'Petite',
        'Average Male Body',
        'Voluptuous'
      ),
      buttType: Joi.string().valid('Small', 'Medium', 'Big'),
      breastSize: Joi.string().valid('Small', 'Medium', 'Big'),
      pussyHair: Joi.string().valid('Shaved', 'Hairy'),
      ethnicity: Joi.string().valid('American', 'Latina', 'Brazilian', 'European', 'Asian'),
    }),
    scenes: Joi.array(),
  }),
};

const getArtists = {
  query: Joi.object().keys({
    name: Joi.string(),
    birthPlace: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getArtist = {
  params: Joi.object().keys({
    artistId: Joi.string().custom(objectId),
  }),
};

const updateArtist = {
  params: Joi.object().keys({
    artistId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      name: Joi.string(),
      photo: Joi.string(),
      description: Joi.string(),
    })
    .min(1),
};

const deleteArtist = {
  params: Joi.object().keys({
    artistId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createArtist,
  getArtists,
  getArtist,
  updateArtist,
  deleteArtist,
};
