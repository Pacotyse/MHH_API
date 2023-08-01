import jwt from "jsonwebtoken";

const token = {
  /**
   * Middleware for JWT generation.
   *
   * This middleware is responsible for generating the JWT for the client.
   * It generates the JWT using user data from the body of the request.
   *
   * @middleware
   * @function generate
   * @param {Object} req - The HTTP request object.
   * @param {string} req.body.id - The user's unique ID.
   * @param {string} req.body.email - The user's email.
   * @param {string} req.body.username - The user's username.
   * @param {Object} res - The HTTP response object.
   * @param {Function} next - The next middleware function.
   * @returns {void}
   */
  generate(req, res, next) {
    try {
      const { id, email, username } = req.body;
      if (!id || !email || !username) {
        return res.status(500).json({ error: "Failed to generate token" });
      }
      const token = jwt.sign(
        {
          id: id,
          email: email,
          username: username,
        },
        process.env.JWT_SECRET,
        { expiresIn: parseInt(process.env.JWT_DURATION) }
      );
      req.body.token = token;
      next();
    } catch (error) {
      return res.status(500).json({ error: "Failed to generate token" });
    }
  }
};

export default token;
