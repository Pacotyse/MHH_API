const session = {
  /**
   * Middleware for creating a session.
   *
   * This middleware is responsible for creating a session for the user by saving the JSON Web Token (JWT)
   * provided in the request body to the 'req.session.jwt' property.
   *
   * @middleware
   * @function create
   * @param {Object} req - The HTTP request object.
   * @param {string} req.body.token - The JSON Web Token (JWT) received from the client.
   * @param {Object} res - The HTTP response object.
   * @param {Function} next - The next middleware function.
   * @returns {void}
   */
  create(req, res, next) {
    // Save the JWT from the request body to the session
    req.session.jwt = req.body.token;
    // Continue to the next middleware
    next();
  },

  /**
   * Middleware for destroying a session.
   *
   * This middleware is responsible for destroying the session of the user.
   * It removes all session data, including the JSON Web Token (JWT), from the request object.
   *
   * @middleware
   * @function destroy
   * @param {Object} req - The HTTP request object.
   * @param {Object} res - The HTTP response object.
   * @param {Function} next - The next middleware function.
   * @returns {void}
   */
  destroy(req, res, next) {
    // Destroy the session, removing all session data
    req.session.destroy();
    // Continue to the next middleware
    next();
  },
};

export default session;
