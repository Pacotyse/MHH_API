import express from "express";
import apiController from "../controllers/api.controller.js";

const router = express.Router();

/**
 * Route for retrieving a list of all armors.
 *
 * @route GET /armors
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 * @returns {Object} JSON response containing the list of armorss or an error message.
 * @throws {Error} Will throw an error if there's a server-side issue.
 */
router.route("/").get(apiController.armor.getAll);

/**
 * Route for retrieving a single armor by its ID.
 *
 * @route GET /armors/:id
 * @param {Object} req - The HTTP request object.
 * @param {string} req.params.id - The ID of the armor to retrieve.
 * @param {Object} res - The HTTP response object.
 * @returns {Object} JSON response containing the armor data or an error message.
 * @throws {Error} Will throw an error if the armor with the provided ID is not found or if there's a server-side issue.
 */
router.route("/:id").get(apiController.armor.getOne);

export default router;
