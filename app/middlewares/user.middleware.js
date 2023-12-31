import bcrypt from "bcrypt";
import apiModel from "../models/api.dataMapper.js";

const user = {
  /**
   * Middleware for user matching.
   *
   * This middleware checks if there is any match in the database based on the provided data.
   * Both email and username must be unique in the database to pass this check.
   *
   * @middleware
   * @function matching
   * @param {Object} req - The HTTP request object.
   * @param {string} req.body.email - The email of the user to be registered.
   * @param {string} req.body.username - The username of the user to be registered.
   * @param {Object} res - The HTTP response object.
   * @param {Function} next - The next middleware function.
   * @returns {void}
   */
  async matching(req, res, next) {
    try {
      // Extract the email and username from the request body
      const { email, username } = req.body;

      // Check if an email is provided
      if (email) {
        // Query the database to find a user with the provided email
        const data = await apiModel.user.findByEmail(email);

        // If a user with the same email exists, return a 403 Forbidden response
        if (data) {
          return res.status(403).json({ error: "Unauthorized access." });
        }
      }

      // Check if a username is provided
      if (username) {
        // Query the database to find a user with the provided username
        const data = await apiModel.user.findBy("username", username);

        // If a user with the same username exists, return a 403 Forbidden response
        if (data) {
          return res.status(403).json({ error: "Unauthorized access." });
        }
      }

      // If no matching user is found, proceed to the next middleware
      next();
    } catch (error) {
      // Handle any internal server errors with a 500 Internal Server Error response
      res.status(500).json({ error: "Internal server error" });
    }
  },

  /**
   * Middleware for user registration.
   *
   * This middleware takes care of user registration by formatting the email to lowercase,
   * hashing the password using bcrypt, and storing the formatted email and hashed password
   * back in the request body for further processing.
   *
   * @middleware
   * @function register
   * @param {Object} req - The HTTP request object.
   * @param {string} req.body.email - The email of the user to be registered.
   * @param {string} req.body.password - The password of the user to be registered.
   * @param {Object} res - The HTTP response object.
   * @param {Function} next - The next middleware function.
   * @returns {void}
   */
  async register(req, res, next) {
    try {
      const { email, password, username } = req.body;

      // Validate email and password existence.
      if (!email || !password || !username) {
        return res
          .status(400)
          .json({ error: "Email, password and username are required." });
      }

      // Format the email to lowercase before storing it.
      const formattedEmail = email.toLowerCase();
      req.body.email = formattedEmail;

      // Hash the password using bcrypt with the provided BCRYPT_ROUNDS.
      const hashedPassword = await bcrypt.hash(
        password,
        parseInt(process.env.BCRYPT_ROUNDS)
      );

      // Replace the password with the hashed version in the request body.
      req.body.password = hashedPassword;

      next();
    } catch (error) {
      // Handle errors properly and send a meaningful response.
      console.error("Error during registration:", error);
      res.status(500).json({
        error: "An internal error has occurred",
      });
    }
  },

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
  async login(req, res, next) {
    // Extract email and password from the request body.
    const { email, password } = req.body;

    try {
      // Check if both email and password are provided.
      if (!email || !password) {
        return res
          .status(400)
          .json({ error: "Email and password are required." });
      }

      // Query the database to find a user with the given email.
      const data = await apiModel.user.findByEmail(email);

      if (data) {
        // Compare the provided password with the hashed password stored in the database.
        const passwordMatch = await bcrypt.compare(password, data.password);

        if (passwordMatch) {
          // Save user's ID in the parameter of the URL
          req.params.id = data.id;
          // Save user's data in the body of the request
          req.body = {
            email: data.email,
            username: data.username,
          };
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
      res.status(500).json({ error: "An internal error has occurred." });
    }
  },
  /**
   * Middleware for checking user ID against token ID.
   *
   * This middleware checks if the 'user_id' in the URL parameters matches the 'user_id' from the JWT token.
   * If the IDs do not match, it returns a 403 Forbidden response, indicating unauthorized access.
   *
   * @middleware
   * @function check
   * @param {Object} req - The HTTP request object.
   * @param {Object} res - The HTTP response object.
   * @param {Function} next - The next middleware function.
   * @returns {void}
   * @throws {Error} Throws an error if there's a problem with the user ID comparison or if there's an internal server error.
   */
  async check(req, res, next) {
    try {
      const user_id = req.params.id;
      const token_id = req.user.id;

      // Ensure both user_id values are integers for strict comparison
      const userIdFromUrl = parseInt(user_id, 10);
      const userIdFromToken = parseInt(token_id, 10);

      // Check if the user making the request is the same as the user in the JWT
      if (userIdFromUrl !== userIdFromToken) {
        return res.status(403).json({ error: "Unauthorized access." });
      }

      // If user_id and token_id match, continue with the request
      next();
    } catch (error) {
      // Handle any internal server errors with a 500 Internal Server Error response
      res.status(500).json({ error: "Internal server error" });
    }
  },
};

export default user;
