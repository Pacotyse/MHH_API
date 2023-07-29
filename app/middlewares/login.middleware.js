import bcrypt from "bcrypt";
import apiModel from "../models/api.dataMapper.js";

/**
 * Middleware for user authentication.
 *
 * This middleware is responsible for authenticating users by checking the provided email and password.
 * It queries the database to find a user with the given email, and then compares the provided password
 * with the hashed password stored in the database using 'bcrypt.compare'.
 * If the email and password match with a user in the database, the next middleware function is called.
 * If the email or password is incorrect, a 401 Unauthorized response is sent to the client.
 * If any internal error occurs during the process, a 500 Internal Server Error response is sent.
 *
 * @middleware
 * @function login
 * @param {Object} req - The HTTP request object.
 * @param {string} req.body.email - The email of the user trying to log in.
 * @param {string} req.body.password - The password of the user trying to log in.
 * @param {Object} res - The HTTP response object.
 * @param {Function} next - The next middleware function.
 * @returns {void}
 */
async function login(req, res, next) {
  // Extract email and password from the request body.
  const { email, password } = req.body;

  try {
    // Check if both email and password are provided.
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required." });
    }

    // Query the database to find a user with the given email.
    const data = await apiModel.user.findByEmail(email);

    if (data) {
      // Compare the provided password with the hashed password stored in the database.
      const passwordMatch = await bcrypt.compare(password, data.password);

      if (passwordMatch) {
        // User authenticated, call the next middleware function.
        next();
      } else {
        // Password does not match, return a 401 Unauthorized response.
        res.status(401).json({ error: "Invalid email or password." });
      }
    } else {
      // User with the given email not found, return a 401 Unauthorized response.
      res.status(401).json({ error: "Invalid email or password." });
    }
  } catch (error) {
    // Handle any internal error that occurs during the login process.
    console.error("Error during login:", error);
    res.status(500).json({ error: "An internal error has occurred." });
  }
}

export default login;
