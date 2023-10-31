import express from "express";
import apiController from "../controllers/api.controller.js";
import token from "../middlewares/token.middleware.js";

const router = express.Router();

/**
 * Get all loadouts or create a new loadout.
 *
 * @route {GET, POST} /
 * @name GetAllLoadouts/CreateLoadout
 * @function
 * @memberof module:routes/apiRouter
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 * @throws {Error} Will throw an error if there's a server-side issue.
 */
router
  .route("/")
  .get(apiController.loadout.getAll)
  .post(token.authentication, apiController.loadout.createOne);

/**
 * Get, update, or delete a loadout by ID.
 *
 * @route {GET, PUT, DELETE} /:id
 * @name GetUpdateDeleteLoadout
 * @function
 * @memberof module:routes/apiRouter
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 * @throws {Error} Will throw an error if the loadout with the provided ID is not found, if the authenticated user is not authorized for certain actions, or if there's a server-side issue.
 */
router
  .route("/:id")
  .get(apiController.loadout.getOne)
  .put(token.authentication, apiController.loadout.updateOne)
  .delete(token.authentication, apiController.loadout.deleteOne);

export default router;
