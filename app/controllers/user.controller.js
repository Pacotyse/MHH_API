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
      // Extract the user ID from the request parameters
      const { id } = req.params;

      // Retrieve the user data by ID using the API model
      const data = await apiModel.user.findByPk(id);

      // Check if the user data is found
      if (!data) {
        return res.status(404).json({ error: "User not found." });
      }

      // Send the user data as a JSON response
      res.json(data);
    } catch (error) {
      // Handle any internal server errors with a 500 Internal Server Error response
      res.status(500).json({ error: "Internal server error" });
    }
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
      // Extract email, password, and username from the request body
      const { email, password, username } = req.body;

      // Check if any of the required fields are missing
      if (!email || !password || !username) {
        return res.status(400).json({ error: "Missing required fields." });
      }

      // Create a new user using the API model
      const newUser = await apiModel.user.create({
        email,
        password,
        username,
      });

      // Send the new user data as a JSON response with a 201 Created status code
      res.status(201).json(newUser);
    } catch (error) {
      // Handle any internal server errors with a 500 Internal Server Error response
      res.status(500).json({ error: "Internal server error" });
    }
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
      // Extract user_id from the request parameters and input data from the request body
      const user_id = req.params.id;
      const inputData = req.body;

      // Check if 'id' field is included in the updated data (forbidden field)
      if (inputData.id) {
        return res.status(403).json({ error: "Forbidden field" });
      }

      // Update the existing user with the provided ID using the API model
      const updatedUser = await apiModel.user.update({
        id: user_id,
        ...inputData,
      });

      // Send the updated user data as a JSON response with a 201 Created status code
      res.status(201).json(updatedUser);
    } catch (error) {
      // Handle any internal server errors with a 500 Internal Server Error response
      res.status(500).json({ error: "Internal server error" });
    }
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
      // Extract user_id from the request parameters
      const user_id = req.params.id;

      // Delete the user with the provided ID using the API model
      const deletedData = await apiModel.user.delete(user_id);

      // Send a 204 No Content response to indicate successful deletion
      res.status(204).json(deletedData);
    } catch (error) {
      // Handle any internal server errors with a 500 Internal Server Error response
      res.status(500).json({ error: "Internal server error" });
    }
  },
};

export default userController;
