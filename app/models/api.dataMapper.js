import client from './pg.client.js';
import User from './user.dataMapper.js';
import Weapon from './weapon.dataMapper.js';

const apiModel = {
  user: new User(client),
  weapon: new Weapon(client)
}

export default apiModel;