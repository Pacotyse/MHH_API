import client from './pg.client.js';
import User from './user.dataMapper.js';

const apiModel = {
  user: new User(client)
}

export default apiModel;