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
      const { id } = req.params;
      const { email, username } = req.body;
      // Check if the required data is provided correctly
      if (!id || !email || !username) {
        return res.status(500).json({ error: "Failed to generate token" });
      }
      // Generate the token
      const tokenValue = jwt.sign(
        // Provide data to generate the token
        {
          id: id,
          email: email,
          username: username,
        },
        // Define the secret password to encrypt the token
        process.env.JWT_SECRET,
        // Define the token duration
        { expiresIn: parseInt(process.env.JWT_DURATION) }
      );
      //   Add token's type to the token value
      const token = `Bearer ${tokenValue}`;
      // Add the generated token to req.body
      req.body.token = token;
      // Token generated, call the next middleware function.
      next();
    } catch (error) {
      return res.status(500).json({ error: "Failed to generate token" });
    }
  }
};

export default token;
