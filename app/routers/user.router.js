import express from "express";
import apiController from "../controllers/api.controller.js";
import token from "../middlewares/token.middleware.js";
import user from "../middlewares/user.middleware.js";

const router = express.Router();

/**
 * Route for updating and deleting a user by ID.
 *
 * @route PUT /:id
 * @route DELETE /:id
 * @middleware token.authentication - Middleware for JWT authentication.
 * @middleware user.check - Middleware for checking user ID and token ID match.
 * @middleware user.matching - Middleware for checking if the user already exists (for PUT request).
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 * @returns {void}
 */
router.route("/:id")
  .put(
    token.authentication,
    user.check,
    user.matching,
    apiController.user.updateOne
  )
  .delete(
    token.authentication,
    user.check, 
    apiController.user.deleteOne
  );

export default router;
