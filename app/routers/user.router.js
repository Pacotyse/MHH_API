import express from "express";
import apiController from "../controllers/api.controller.js";
import token from "../middlewares/token.middleware.js";

const router = express.Router();

router.route("/").get(token.authentication, (req, res) => {res.json(req.user)});

router.route("/:id")
  .get(apiController.user.getOne)
  .put(token.authentication, apiController.user.updateOne)
  .delete(token.authentication, apiController.user.deleteOne);

export default router;
