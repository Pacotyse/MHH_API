import client from './pg.client.js';
import User from './user.dataMapper.js';
import Loadout from './loadout.dataMapper.js';
import Weapon from './weapon.dataMapper.js';

const apiModel = {
  user: new User(client),
  loadout: new Loadout(client),
  weapon: new Weapon(client)
}

export default apiModel;