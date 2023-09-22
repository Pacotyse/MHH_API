import express from "express";
import apiController from "../controllers/api.controller.js";
import token from "../middlewares/token.middleware.js";
import user from "../middlewares/user.middleware.js";

const router = express.Router();

router.route("/:id")
  .put(token.authentication, user.check, user.matching, apiController.user.updateOne)
  .delete(token.authentication, user.check, apiController.user.deleteOne);

export default router;
