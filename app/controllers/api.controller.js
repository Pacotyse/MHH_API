import userController from './user.controller.js';
import loadoutController from './loadout.controller.js';
import weaponController from './weapon.controller.js';

const apiController = {
  user: userController,
  loadout: loadoutController,
  weapon: weaponController
}

export default apiController;
