const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const producerSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    logo: {
      type: String,
    },
    dateOfFoundation: {
      type: Date,
      trim: true,
    },
    description: {
      type: String,
    },
    headquarter: {
      type: String,
    },
    site: {
      type: String,
    },
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
producerSchema.plugin(toJSON);
producerSchema.plugin(paginate);

/**
 * @typedef Producer
 */
const Producer = mongoose.model('Producer', producerSchema);

module.exports = Producer;
