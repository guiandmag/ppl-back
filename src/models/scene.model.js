const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const sceneSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
    },
    rating: {
      type: Number,
      min: 0,
      max: 5,
      default: 3,
      required: true,
    },
    director: {
      type: String,
    },
    launchDate: {
      type: Date,
      required: true,
    },
    thumbnail: {
      type: String,
    },
    filePath: {
      type: String,
      required: true,
      trim: true,
    },
    tags: [
      {
        name: { String },
      },
    ],
    artists: [
      {
        type: mongoose.Types.ObjectId,
        ref: 'Artist',
        required: true,
      },
    ],
    producer: [
      {
        type: mongoose.Types.ObjectId,
        ref: 'Producer',
        required: true,
      },
    ],
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
sceneSchema.plugin(toJSON);
sceneSchema.plugin(paginate);

/**
 * @typedef Scene
 */
const Scene = mongoose.model('Scene', sceneSchema);

module.exports = Scene;
