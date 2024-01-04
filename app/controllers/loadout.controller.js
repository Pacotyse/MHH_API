import apiModel from "../models/api.dataMapper.js";

const loadoutController = {
  /**
   * Get all loadouts.
   *
   * @async
   * @function getAll
   * @param {Object} req - The HTTP request object.
   * @param {Object} res - The HTTP response object.
   * @returns {void}
   * @throws {Error} Will throw an error if there's a server-side issue.
   */
  async getAll(req, res) {
    try {
      // Extract the limit value from the query parameters
      const { limit } = req.query;

      // Retrieve all loadout data using the API model
      const data = await apiModel.loadout.findAll(limit);

      // Check if loadout data is found
      if (!data) {
        return res.status(404).json({ error: "Loadouts not found." });
      }

      // Send the loadout data as a JSON response
      res.json(data);
    } catch (error) {
      // Handle any internal server errors with a 500 Internal Server Error response
      res.status(500).json({ error: "Internal server error" });
    }
  },

  /**
   * Get a single loadout by ID.
   *
   * @async
   * @function getOne
   * @param {Object} req - The HTTP request object.
   * @param {string} req.params.id - The ID of the loadout to retrieve.
   * @param {Object} res - The HTTP response object.
   * @returns {void}
   * @throws {Error} Will throw an error if the loadout with the provided ID is not found or if there's a server-side issue.
   */
  async getOne(req, res) {
    try {
      // Extract the loadout ID from the request parameters
      const { id } = req.params;

      // Retrieve the loadout data by ID using the API model
      const data = await apiModel.loadout.findByPk(id);

      // Check if the loadout data is found
      if (!data) {
        return res.status(404).json({ error: "Loadout not found." });
      }

      // Send the loadout data as a JSON response
      res.json(data);
    } catch (error) {
      // Handle any internal server errors with a 500 Internal Server Error response
      res.status(500).json({ error: "Internal server error" });
    }
  },

  /**
   * Create a new loadout.
   *
   * @async
   * @function createOne
   * @param {Object} req - The HTTP request object.
   * @param {string} req.body.name - The name of the new loadout.
   * @param {string} req.body.description - The description of the new loadout.
   * @param {json} req.body.weapon - The weapon of the new loadout.
   * @param {Object} res - The HTTP response object.
   * @returns {void}
   * @throws {Error} Will throw an error if any of the required fields (name, description, or weapon) are missing or if there's a server-side issue.
   */
  async createOne(req, res) {
    try {
      // Extract user_id from the token authentication
      const user_id = req.user.id;

      // Extract all inputData from the request body
      const inputData = req.body;

      // Check if any of the required fields are missing
      if (!inputData.name || !inputData.description || !inputData.weapon) {
        return res.status(400).json({ error: "Missing required fields." });
      }

      // Create a new loadout using the API model
      const newLoadout = await apiModel.loadout.create({
        user_id,
        ...inputData
      });

      // Send the new loadout data as a JSON response with a 201 Created status code
      res.status(201).json(newLoadout);
    } catch (error) {
      // Handle any internal server errors with a 500 Internal Server Error response
      res.status(500).json({ error: "Internal server error" });
    }
  },

  /**
   * Update a loadout by ID.
   *
   * @async
   * @function updateOne
   * @param {Object} req - The HTTP request object.
   * @param {string} req.params.id - The ID of the loadout to update.
   * @param {Object} req.body - The updated loadout data in the request body.
   * @param {string} req.user.id - The ID of the authenticated user making the request.
   * @param {Object} res - The HTTP response object.
   * @returns {void}
   * @throws {Error} Will throw an error if the loadout with the provided ID is not found, if the authenticated user is not authorized to update the loadout, if the 'id' field is included in the updated data (forbidden field), or if there's a server-side issue.
   */
  async updateOne(req, res) {
    try {
      // Extract loadout_id from the request parameters and input data from the request body
      const loadout_id = req.params.id;
      const inputData = req.body;

      // Extract user_id from the token authentication
      const user_id = req.user.id;

      // Retrieve the loadout data by ID using the API model
      const data = await apiModel.loadout.findByPk(loadout_id);

      // Check if the loadout data is found
      if (!data) {
        return res.status(404).json({ error: "Loadout not found." });
      }

      // Compare the user_id from the token and the user_id from the inputData
      if (user_id != data.user_id) {
        return res.status(403).json({ error: "Unauthorized access." });
      }

      // Check if 'id' field is included in the updated data (forbidden field)
      if (inputData.id) {
        return res.status(403).json({ error: "Forbidden field" });
      }

      // Update the existing loadout with the provided ID using the API model
      const updatedLoadout = await apiModel.loadout.update({
        id: loadout_id,
        ...inputData,
      });

      // Send the updated loadout data as a JSON response with a 201 Created status code
      res.status(201).json(updatedLoadout);
    } catch (error) {
      // Handle any internal server errors with a 500 Internal Server Error response
      res.status(500).json({ error: "Internal server error" });
    }
  },

  /**
   * Delete a loadout by ID.
   *
   * @async
   * @function deleteOne
   * @param {Object} req - The HTTP request object.
   * @param {string} req.params.id - The ID of the loadout to delete.
   * @param {string} req.user.id - The ID of the authenticated user making the request.
   * @param {Object} res - The HTTP response object.
   * @returns {void}
   * @throws {Error} Will throw an error if the loadout with the provided ID is not found, if the authenticated user is not authorized to delete the loadout, or if there's a server-side issue.
   */
  async deleteOne(req, res) {
    try {
      // Extract loadout_id from the request parameters
      const loadout_id = req.params.id;

      // Extract user_id from the token authentication
      const user_id = req.user.id;

      // Retrieve the loadout data by ID using the API model
      const data = await apiModel.loadout.findByPk(loadout_id);

      // Check if the loadout data is found
      if (!data) {
        return res.status(404).json({ error: "Loadout not found." });
      }

      // Compare the user_id from the token and the user_id from the founded data
      if (user_id != data.user_id) {
        return res.status(403).json({ error: "Unauthorized access." });
      }
      
      // Delete the loadout with the provided ID using the API model
      const deletedData = await apiModel.loadout.delete(data.id);

      // Send a 204 No Content response to indicate successful deletion
      res.status(204).json(deletedData);
    } catch (error) {
      // Handle any internal server errors with a 500 Internal Server Error response
      res.status(500).json({ error: "Internal server error" });
    }
  },
};

export default loadoutController;
