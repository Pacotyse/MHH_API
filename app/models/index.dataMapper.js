import client from './pg.client.js';
import User from './user.dataMapper.js';

const apiModels = {
  user: new User(client)
}

export default apiModels;