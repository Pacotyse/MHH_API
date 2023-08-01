import express from "express";
import user from "../middlewares/user.middleware.js";
import token from "../middlewares/token.middleware.js";
import session from "../middlewares/session.middleware.js";
import apiController from "../controllers/api.controller.js";
import userRouter from "./user.router.js";

const router = express.Router();

router.use("/users", userRouter);

/**
 * Route for user registration.
 *
 * @route POST /register
 * @middleware user.register
 * @param {Object} req.body - The request body containing the user's email and password.
 * @param {Object} res - The HTTP response object.
 * @param {Function} next - The next middleware function.
 * @throws {Error} An error may be thrown if encryption fails.
 * @returns {void}
 */
router.route("/register").post(user.register, apiController.user.createOne);

/**
 * Route for authenticating users.
 *
 * @route POST /login
 * @middleware user.login - Compare data (email, password) provided by client and data from database.
 * @middleware token.generate - Generate token with data from database
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 * @returns {void}
 */
router
  .route("/login")
  .post(user.login, token.generate, session.create, apiController.user.getOne);

/**
 * Route for logging out users.
 *
 * @route GET /logout
 * @middleware session.destroy - Destroy session's user along with their JSON Web Token.
 * @param {Object} req - The HTTP request object.
 * @param {Boolean} res - The HTTP response object.
 * @returns {void}
 */
router.route("/logout").get(session.destroy, (req, res) => {
  res.json(true);
});

export default router;
