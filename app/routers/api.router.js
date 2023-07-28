import express from "express";
import bcrypt from "../middlewares/encrypt.middleware.js";
import apiController from "../controllers/api.controller.js";

import userRouter from "./user.router.js";

const router = express.Router();

router.use("/users", userRouter);

router.route("/register").post(bcrypt, apiController.user.createOne);

export default router;
