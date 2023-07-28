import bcrypt from "bcrypt";

/**
 * Middleware for encrypting the user's password.
 * Retrieves the password from the request body
 * and encrypts it before storing it under the same key "password"
 * in the request. The encrypted password is ready to be securely
 * saved in the database.
 *
 * @middleware
 * @function password
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 * @param {Function} next - The next middleware function.
 * @throws {Error} An error may be thrown if encryption fails.
 * @returns {void}
 */

async function password(req, res, next) {
  try {
    const { password } = req.body;
    const hashedPassword = await bcrypt.hash(
      password,
      parseInt(process.env.BCRYPT_SECRET)
    );
    req.body.password = hashedPassword;
    next();
  } catch (error) {
    res.status(500).send({
      message: "An error has occured ",
    });
  }
}

export default password;