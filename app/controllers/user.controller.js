import apiModel from '../models/api.dataMapper.js';

const userController = {
    async getAll(req, res) {
      const data = await apiModel.user.findAll();
      res.json(data);
    },
    async getOne(req, res) {
      const { id } = req.params;
      const data = await apiModel.user.findByPk(id);
      res.json(data);
    },
    async createOne(req, res) {
      const {
        email, password, username,
      } = req.body;
      const newUser = await apiModel.user.create({
        email, password, username,
      });
      res.status(201).json(newUser);
  },
  async updateOne(req, res) {
    const { id } = req.params;
    const { username } = req.body;
    // const { userId } = req;
    const data = await apiModel.user.findByPk(id);
    // if (data.id === userId) {
    const updatedUser = await apiModel.user.update({
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
    const deletedData = await apiModel.user.delete(user_id);
    res.status(201).json(deletedData);
    // } else {
    //   res.status(403).json({ error: 'Unauthorized access.' });
    // }
  },
};

export default userController;