import apiModels from '../models/index.dataMapper.js';

const userController = {
    async getAll(req, res) {
      const data = await apiModels.user.findAll();
      res.json(data);
    },
    async getOne(req, res) {
      const { id } = req.params;
      const data = await apiModels.user.findByPk(id);
      res.json(data);
    },
    async createOne(req, res) {
      const {
        email, password, username,
      } = req.body;
      const newUser = await apiModels.user.create({
        email, password, username,
      });
      res.status(201).json(newUser);
  },
  async updateOne(req, res) {
    const { id } = req.params;
    const { username } = req.body;
    // const { userId } = req;
    const data = await apiModels.user.findByPk(id);
    // if (data.id === userId) {
    const updatedUser = await apiModels.user.update({
      username,
    });
    res.status(201).json(updatedUser);
    // } else {
    //   res.status(403).json({ error: 'Unauthorized access.' });
    // }
  },
  async deleteOne(req, res) {
    const user_id = req.params.id;
    // const { userId } = req;
    // if (Number(user_id) === userId) {
    const deletedData = await apiModels.user.delete(user_id);
    res.status(201).json(deletedData);
    // } else {
    //   res.status(403).json({ error: 'Unauthorized access.' });
    // }
  },
};

export default userController;