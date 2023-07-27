import express from 'express';
import apiController from '../controllers/api.controller.js'

const router = express.Router();

router.route('/')
  .get(apiController.user.getAll)
  .post(apiController.user.createOne);

router.route('/:id')
  .get(apiController.user.getOne)
  .put(apiController.user.updateOne)
  .delete(apiController.user.deleteOne);

export default router;
