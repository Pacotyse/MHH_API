import apiModel from "../models/api.dataMapper.js";

const armorController = {
  /**
   * Get all armors.
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

      // Retrieve all armor data using the API model
      const data = await apiModel.armor.findAll(limit);

      // Check if armor data is found
      if (!data) {
        return res.status(404).json({ error: "Armors not found." });
      }

      // Send the armor data as a JSON response
      res.json(data);
    } catch (error) {
      // Handle any internal server errors with a 500 Internal Server Error response
      res.status(500).json({ error: "Internal server error" });
    }
  },

  /**
   * Get all armors.
   *
   * @async
   * @function getAll
   * @param {Object} req - The HTTP request object.
   * @param {Object} res - The HTTP response object.
   * @returns {void}
   * @throws {Error} Will throw an error if there's a server-side issue.
   */
  async getAllBy(req, res) {
    try {
      const inputData = req.query;

      const data = await apiModel.armor.getAllByParams(inputData);

      // Check if armor data is found
      if (!data) {
        return res.status(404).json({ error: "armors not found." });
      }

      // Send the armor data as a JSON response
      res.json(data);
    } catch (error) {
      // Handle any internal server errors with a 500 Internal Server Error response
      res.status(500).json({ error: "Internal server error" });
    }
  },

  /**
   * Get a single armor by ID.
   *
   * @async
   * @function getOne
   * @param {Object} req - The HTTP request object.
   * @param {string} req.params.id - The ID of the armor to retrieve.
   * @param {Object} res - The HTTP response object.
   * @returns {void}
   * @throws {Error} Will throw an error if the armor with the provided ID is not found or if there's a server-side issue.
   */
  async getOne(req, res) {
    try {
      // Extract the armor ID from the request parameters
      const { id } = req.params;

      // Retrieve the armor data by ID using the API model
      const data = await apiModel.armor.findByPk(id);

      // Check if the armor data is found
      if (!data) {
        return res.status(404).json({ error: "Armor not found." });
      }

      // Send the armor data as a JSON response
      res.json(data);
    } catch (error) {
      // Handle any internal server errors with a 500 Internal Server Error response
      res.status(500).json({ error: "Internal server error" });
    }
  },
};

export default armorController;
