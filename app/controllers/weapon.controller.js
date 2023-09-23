import apiModel from "../models/api.dataMapper.js";

const weaponController = {
  /**
   * Get all weapons.
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
      // Retrieve all weapon data using the API model
      const data = await apiModel.weapon.findAll();

      // Check if weapon data is found
      if (!data) {
        return res.status(404).json({ error: "Weapons not found." });
      }

      // Send the weapon data as a JSON response
      res.json(data);
    } catch (error) {
      // Handle any internal server errors with a 500 Internal Server Error response
      res.status(500).json({ error: "Internal server error" });
    }
  },

  /**
   * Get a single weapon by ID.
   *
   * @async
   * @function getOne
   * @param {Object} req - The HTTP request object.
   * @param {string} req.params.id - The ID of the weapon to retrieve.
   * @param {Object} res - The HTTP response object.
   * @returns {void}
   * @throws {Error} Will throw an error if the weapon with the provided ID is not found or if there's a server-side issue.
   */
  async getOne(req, res) {
    try {
      // Extract the weapon ID from the request parameters
      const { id } = req.params;

      // Retrieve the weapon data by ID using the API model
      const data = await apiModel.weapon.findByPk(id);

      // Check if the weapon data is found
      if (!data) {
        return res.status(404).json({ error: "Weapon not found." });
      }

      // Send the weapon data as a JSON response
      res.json(data);
    } catch (error) {
      // Handle any internal server errors with a 500 Internal Server Error response
      res.status(500).json({ error: "Internal server error" });
    }
  },
};

export default weaponController;
