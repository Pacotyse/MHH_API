import apiModel from "../models/api.dataMapper.js";

const skillController = {
  /**
   * Get all skills.
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

      // Retrieve all skill data using the API model
      const data = await apiModel.skill.findAll(limit);

      // Check if skill data is found
      if (!data) {
        return res.status(404).json({ error: "Skills not found." });
      }

      // Send the skill data as a JSON response
      res.json(data);
    } catch (error) {
      // Handle any internal server errors with a 500 Internal Server Error response
      res.status(500).json({ error: "Internal server error" });
    }
  },

  /**
   * Get all skills.
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

      const data = await apiModel.skill.getAllByParams(inputData);

      // Check if skill data is found
      if (!data) {
        return res.status(404).json({ error: "Skills not found." });
      }

      // Send the skill data as a JSON response
      res.json(data);
    } catch (error) {
      // Handle any internal server errors with a 500 Internal Server Error response
      res.status(500).json({ error: "Internal server error" });
    }
  },

  /**
   * Get a single skill by ID.
   *
   * @async
   * @function getOne
   * @param {Object} req - The HTTP request object.
   * @param {string} req.params.id - The ID of the skill to retrieve.
   * @param {Object} res - The HTTP response object.
   * @returns {void}
   * @throws {Error} Will throw an error if the skill with the provided ID is not found or if there's a server-side issue.
   */
  async getOne(req, res) {
    try {
      // Extract the skill ID from the request parameters
      const { id } = req.params;

      // Retrieve the skill data by ID using the API model
      const data = await apiModel.skill.findByPk(id);

      // Check if the skill data is found
      if (!data) {
        return res.status(404).json({ error: "Skill not found." });
      }

      // Send the skill data as a JSON response
      res.json(data);
    } catch (error) {
      // Handle any internal server errors with a 500 Internal Server Error response
      res.status(500).json({ error: "Internal server error" });
    }
  },
};

export default skillController;
