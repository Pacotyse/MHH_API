import express from "express";
import user from "../middlewares/user.middleware.js";
import token from "../middlewares/token.middleware.js";
import session from "../middlewares/session.middleware.js";
import apiController from "../controllers/api.controller.js";
import userRouter from "./user.router.js";
import loadoutRouter from "./loadout.router.js";
import weaponRouter from "./weapon.router.js";

const router = express.Router();

router.use("/users", userRouter);
router.use("/loadouts", loadoutRouter);
router.use("/weapons", weaponRouter);

/**
 * Route for user registration.
 *
 * @route POST /register
 * @middleware user.matching - Middleware for checking if the user already exists.
 * @middleware user.register - Middleware for user registration.
 * @param {Object} req.body - The request body containing the user's email, password, and username.
 * @param {Object} res - The HTTP response object.
 * @param {Function} next - The next middleware function.
 * @throws {Error} An error may be thrown if encryption fails or if there's an issue with the registration process.
 * @returns {void}
 */
router.route("/register").post(
  user.matching,
  user.register,
  apiController.user.createOne
);

/**
 * Route for authenticating users.
 *
 * @route POST /login
 * @middleware user.login - Middleware for comparing data (email, password) provided by the client and data from the database.
 * @middleware token.generate - Middleware for generating a token with data from the database.
 * @middleware session.create - Middleware for creating a cookie session for storing the JSON Web Token.
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 * @returns {void}
 */
router.route("/login").post(
  user.login,
  token.generate,
  session.create,
  apiController.user.getOne
);

/**
 * Route for logging out users.
 *
 * @route GET /logout
 * @middleware session.destroy - Middleware for destroying the session's user along with their JSON Web Token.
 * @param {Object} req - The HTTP request object.
 * @param {Boolean} res - The HTTP response object.
 * @returns {void}
 */
router.route("/logout").get(session.destroy, (req, res) => {
  // Respond with a JSON boolean value 'true' to indicate successful logout
  res.json(true);
});

export default router;
