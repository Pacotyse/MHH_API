import express from 'express';
import apiController from '../controllers/api.controller.js'
import bcrypt from '../middlewares/encrypt.middleware.js';

const router = express.Router();

router.route('/')
  .get(apiController.user.getAll)
  .post(bcrypt, apiController.user.createOne);

router.route('/:id')
  .get(apiController.user.getOne)
  .put(apiController.user.updateOne)
  .delete(apiController.user.deleteOne);

export default router;
