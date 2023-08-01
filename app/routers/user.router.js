import express from "express";
import apiController from "../controllers/api.controller.js";
import token from "../middlewares/token.middleware.js";

const router = express.Router();

router.route("/:id")
  .put(token.authentication, apiController.user.updateOne)
  .delete(token.authentication, apiController.user.deleteOne);

export default router;
