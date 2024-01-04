import express from "express";
import apiController from "../controllers/api.controller.js";

const router = express.Router();

/**
 * Route for retrieving a list of all skills.
 *
 * @route GET /skills
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 * @returns {Object} JSON response containing the list of skills or an error message.
 * @throws {Error} Will throw an error if there's a server-side issue.
 */
router.route("/").get(apiController.skill.getAll);

/**
 * Route for retrieving a single skill by its ID.
 *
 * @route GET /skills/:id
 * @param {Object} req - The HTTP request object.
 * @param {string} req.params.id - The ID of the skill to retrieve.
 * @param {Object} res - The HTTP response object.
 * @returns {Object} JSON response containing the skill data or an error message.
 * @throws {Error} Will throw an error if the skill with the provided ID is not found or if there's a server-side issue.
 */
router.route("/:id").get(apiController.skill.getOne);

export default router;
