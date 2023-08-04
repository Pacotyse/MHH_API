import apiModel from "../models/api.dataMapper.js";

const userController = {
  /**
   * Get a single user by ID.
   *
   * @async
   * @function getOne
   * @param {Object} req - The HTTP request object.
   * @param {string} req.params.id - The ID of the user to retrieve.
   * @param {Object} res - The HTTP response object.
   * @returns {void}
   * @throws {Error} Will throw an error if the user with the provided ID is not found or if there's a server-side issue.
   */
  async getOne(req, res) {
    try {
      const { id } = req.params;
      const data = await apiModel.user.findByPk(id);
      if (!data) {
        return res.status(404).json({ error: "User not found." });
      };
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    };
  },

  /**
   * Create a new user.
   *
   * @async
   * @function createOne
   * @param {Object} req - The HTTP request object.
   * @param {string} req.body.email - The email of the new user.
   * @param {string} req.body.password - The password of the new user.
   * @param {string} req.body.username - The username of the new user.
   * @param {Object} res - The HTTP response object.
   * @returns {void}
   * @throws {Error} Will throw an error if any of the required fields (email, password, or username) are missing or if there's a server-side issue.
   */
  async createOne(req, res) {
    try {
      const { email, password, username } = req.body;
      if (!email || !password || !username) {
        return res.status(400).json({ error: "Missing required fields." });
      };
      const newUser = await apiModel.user.create({
        email,
        password,
        username,
      });
      res.status(201).json(newUser);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    };
  },

  /**
   * Update an existing user by ID.
   *
   * @async
   * @function updateOne
   * @param {Object} req - The HTTP request object.
   * @param {string} req.params.id - The ID of the user to update.
   * @param {string} req.user.id - The ID of the authenticated user making the request.
   * @param {Object} req.body - The updated data for the user.
   * @param {Object} res - The HTTP response object.
   * @returns {void}
   * @throws {Error} Will throw an error if the user with the provided ID is not found, if the authenticated user is not authorized to update the user, or if there's a server-side issue.
   */
  async updateOne(req, res) {
    try {
      const user_id = req.params.id;
      const token_id = req.user.id;
      const inputData = req.body;
      if (parseInt(user_id) !== token_id) {
        return res.status(403).json({ error: "Unauthorized access." });
      };
      const updatedUser = await apiModel.user.update({
        id: user_id,
        ...inputData,
      });
      res.status(201).json(updatedUser);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    };
  },

  /**
   * Delete a user by ID.
   *
   * @async
   * @function deleteOne
   * @param {Object} req - The HTTP request object.
   * @param {string} req.params.id - The ID of the user to delete.
   * @param {string} req.user.id - The ID of the authenticated user making the request.
   * @param {Object} res - The HTTP response object.
   * @returns {void}
   * @throws {Error} Will throw an error if the user with the provided ID is not found, if the authenticated user is not authorized to delete the user, or if there's a server-side issue.
   */
  async deleteOne(req, res) {
    try {
      const user_id = req.params.id;
      const token_id = req.user.id;
      if (parseInt(user_id) !== token_id) {
        return res.status(403).json({ error: "Unauthorized access." });
      };
      const deletedData = await apiModel.user.delete(user_id);
      res.status(204).json(deletedData);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    };
  },
};

export default userController;
