const httpStatus = require('http-status');
const { Scene } = require('../models');
const { artistService } = require('.');
const ApiError = require('../utils/ApiError');

/**
 * Create a scene
 * @param sceneBody
 * @returns {Promise<Scene>}
 */
const createScene = async (sceneBody) => {
  if (await Scene.findOne({ name: sceneBody.title })) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Scene already exists');
  }

  Object.values(sceneBody.artists).forEach((id) => {
    if (!artistService.getArtistById({ id })) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Artist not found');
    }
  });

  const scene = Scene.create(sceneBody);

  Object.values(sceneBody.artists).forEach((id) => {
    artistService.updateArtistById({ id, updateBody: { scenes: scene._id } });
  });

  return scene;
};

/**
 * Query for scenes
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryScenes = async (filter, options) => {
  return Scene.paginate(filter, options);
};

/**
 * Get scene by id
 * @param {ObjectId} id
 * @returns {Promise<Scene>}
 */
const getSceneById = async (id) => {
  return Scene.findById(id);
};

/**
 * Get scene by name
 * @param {string} title
 * @returns {Promise<Scene>}
 */
const getSceneByTitle = async (title) => {
  return Scene.findOne({ title });
};

/**
 * Update scene by id
 * @param {ObjectId} sceneId
 * @param {Object} updateBody
 * @returns {Promise<Scene>}
 */
const updateSceneById = async (sceneId, updateBody) => {
  const scene = await getSceneById(sceneId);
  if (!scene) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Scene not found');
  }

  Object.assign(scene, updateBody);
  await scene.save();
  return scene;
};

/**
 * Delete scene by id
 * @param {ObjectId} sceneId
 * @returns {Promise<Scene>}
 */
const deleteSceneById = async (sceneId) => {
  const scene = await getSceneById(sceneId);
  if (!scene) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Scene not found');
  }
  await scene.remove();
  return scene;
};

module.exports = {
  createScene,
  queryScenes,
  getSceneById,
  getSceneByTitle,
  updateSceneById,
  deleteSceneById,
};
