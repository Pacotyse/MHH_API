import userController from './user.controller.js';
import weaponController from './weapon.controller.js';

const apiController = {
  user: userController,
  weapon: weaponController
}

export default apiController;
