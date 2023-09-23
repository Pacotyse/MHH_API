import express from "express";
import apiController from "../controllers/api.controller.js";

const router = express.Router();

/**
 * Route for retrieving a list of all weapons.
 *
 * @route GET /weapons
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 * @returns {Object} JSON response containing the list of weapons or an error message.
 * @throws {Error} Will throw an error if there's a server-side issue.
 */
router.route("/").get(apiController.weapon.getAll);

/**
 * Route for retrieving a single weapon by its ID.
 *
 * @route GET /weapons/:id
 * @param {Object} req - The HTTP request object.
 * @param {string} req.params.id - The ID of the weapon to retrieve.
 * @param {Object} res - The HTTP response object.
 * @returns {Object} JSON response containing the weapon data or an error message.
 * @throws {Error} Will throw an error if the weapon with the provided ID is not found or if there's a server-side issue.
 */
router.route("/:id").get(apiController.weapon.getOne);

export default router;
