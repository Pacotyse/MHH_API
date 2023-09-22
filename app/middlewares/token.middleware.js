import jwt from "jsonwebtoken";

const token = {
  /**
   * Middleware for JWT generation.
   *
   * This middleware is responsible for generating a JWT (JSON Web Token) for the client.
   * It creates the JWT using user data from the request body.
   *
   * @middleware
   * @function generate
   * @param {Object} req - The HTTP request object.
   * @param {string} req.params.id - The user's unique ID.
   * @param {Object} req.body - The HTTP request body containing user data.
   * @param {string} req.body.email - The user's email.
   * @param {string} req.body.username - The user's username.
   * @param {Object} res - The HTTP response object.
   * @param {Function} next - The next middleware function.
   * @returns {void}
   * @throws {Error} Throws an error if there's an issue with token generation or if required data is missing.
   */
  generate(req, res, next) {
    try {
      const { id } = req.params;
      const { email, username } = req.body;

      // Check if the required data is provided correctly
      if (!id || !email || !username) {
        return res.status(500).json({ error: "Failed to generate token" });
      }

      // Generate the JWT token
      const tokenValue = jwt.sign(
        // Data used to generate the token
        {
          id: id,
          email: email,
          username: username,
        },
        // Secret password used to encrypt the token
        process.env.JWT_SECRET,
        // Token duration (expiration time)
        { expiresIn: parseInt(process.env.JWT_DURATION) }
      );

      // Add the token's type ("Bearer") to the token value
      const token = `Bearer ${tokenValue}`;

      // Add the generated token to req.body
      req.body.token = token;

      // Token generated, call the next middleware function.
      next();
    } catch (error) {
      // Handle any errors during token generation
      return res.status(500).json({ error: "Failed to generate token" });
    }
  },

  /**
   * Middleware for JWT authentication.
   *
   * This middleware is responsible for authenticating users using JSON Web Tokens (JWT).
   * It retrieves the JWT from the session, verifies its authenticity using the secret defined in `process.env.JWT_SECRET`,
   * and if valid, decodes the token to extract user information, which is then added to the `req` object.
   *
   * @middleware
   * @function authentication
   * @param {Object} req - The HTTP request object.
   * @param {string} req.session.jwt - The JSON Web Token (JWT) stored in the session.
   * @param {Object} res - The HTTP response object.
   * @param {Function} next - The next middleware function.
   * @returns {void}
   * @throws {Error} An error is thrown if the token is invalid, not provided, or in an incorrect format.
   */
  authentication(req, res, next) {
    try {
      const token = req.session.jwt;

      // Check if a token is provided in the session
      if (!token) {
        return res
          .status(401)
          .json({ error: "Access denied. No token provided." });
      }

      // Split the token into its components (bearer and tokenValue)
      const [bearer, tokenValue] = token.split(" ");

      // Check if the token is in the correct "Bearer" format and has a valid tokenValue
      if (bearer !== "Bearer" || !tokenValue) {
        return res.status(401).json({ error: "Invalid token format." });
      }

      // Verify the token's authenticity using the secret
      const decoded = jwt.verify(tokenValue, process.env.JWT_SECRET);

      // Add the decoded user information to the `req` object
      req.user = decoded;

      // Continue to the next middleware
      next();
    } catch (error) {
      // Handle errors related to invalid tokens
      return res.status(401).json({ error: "Invalid token." });
    }
  },
};

export default token;
