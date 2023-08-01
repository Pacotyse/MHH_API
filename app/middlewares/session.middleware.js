const session = {
  /**
   * Middleware for creating a session.
   *
   * This middleware is responsible for creating a session for the user by saving the JWT (JSON Web Token)
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
    req.session.jwt = req.body.token;
    next();
  },
  /**
   * Middleware for destroying a session.
   *
   * This middleware is responsible for destroying the session of the user.
   * It removes all session data, including the JWT, from the request object.
   *
   * @middleware
   * @function destroy
   * @param {Object} req - The HTTP request object.
   * @param {Object} res - The HTTP response object.
   * @param {Function} next - The next middleware function.
   * @returns {void}
   */
  destroy(req, res, next) {
    req.session.destroy();
    next();
  },
};

export default session;
