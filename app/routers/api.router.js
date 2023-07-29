import express from "express";

import user from "../middlewares/user.middleware.js";

import apiController from "../controllers/api.controller.js";

import userRouter from "./user.router.js";

const router = express.Router();

router.use("/users", userRouter);

/**
 * Route for user registration.
 *
 * @route POST /register
 * @middleware encrypt
 * @param {test} req.body - The request body containing the user's email and password.
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
 * @middleware bcrypt - The middleware function using the 'bcrypt' module.
 * @param {Object} req - The HTTP request object.
 * @param {string} req.body.email - The email of the user to authenticate.
 * @param {string} req.body.password - The password of the user to authenticate.
 * @param {Object} res - The HTTP response object.
 * @returns {void}
 */

router.route("/login").post(user.login, (req, res) => {
    res.send(true);
});

export default router;
