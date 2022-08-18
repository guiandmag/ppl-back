const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const artistSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    photo: {
      type: String,
    },
    dateOfBirth: {
      type: Date,
      trim: true,
    },
    description: {
      type: String,
    },
    birthPlace: {
      type: String,
    },
    tags: [
      {
        hairColor: {
          type: String,
          enum: ['Black', 'Redhead', 'Blonde'],
          default: 'Black',
        },
        bodyArt: {
          type: String,
          enum: ['Piercings', 'Tattoos', 'None'],
          default: 'None',
        },
        bodyType: {
          type: String,
          enum: ['Athletic', 'Slim', 'Average Body', 'Muscular Man', 'Petite', 'Average Male Body', 'Voluptuous'],
        },
        buttType: {
          type: String,
          enum: ['Small', 'Medium', 'Big'],
        },
        breastSize: {
          type: String,
          enum: ['Small', 'Medium', 'Big'],
        },
        pussyHair: {
          type: String,
          enum: ['Shaved', 'Hairy'],
        },
        ethnicity: {
          type: String,
          enum: ['American', 'Latina', 'Brazilian', 'European', 'Asian'],
        },
      },
    ],
    scenes: [
      {
        type: mongoose.Types.ObjectId,
        ref: 'Scene',
      },
    ],
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
artistSchema.plugin(toJSON);
artistSchema.plugin(paginate);

/**
 * @typedef Artist
 */
const Artist = mongoose.model('Artist', artistSchema);

module.exports = Artist;
