import bcrypt from "bcrypt";

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
async function register(req, res, next) {
  try {
    const { email, password } = req.body;

    // Validate email and password existence.
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required." });
    }

    // Format the email to lowercase before storing it.
    const formattedEmail = email.toLowerCase();
    req.body.email = formattedEmail;

    // Check if the email is already registered in the database (optional).
    // You can add a database query here to check for existing emails and prevent duplicate registrations.

    // Hash the password using bcrypt with the provided BCRYPT_ROUNDS.
    const hashedPassword = await bcrypt.hash(password, parseInt(process.env.BCRYPT_ROUNDS));

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
}

export default register;
