import CoreDatamapper from "./core.dataMapper.js";

/**
 * Class representing the 'user' table data mapper.
 *
 * This class extends the 'CoreDatamapper' class to inherit common database operations.
 * The 'tableName' property is set to 'user' to specify the table name in the database.
 * The 'findByEmail' method allows finding a user by their email in the database.
 *
 * @class User
 * @extends CoreDatamapper
 */
class User extends CoreDatamapper {
  /**
   * The name of the table in the database.
   * @type {string}
   */
  tableName = "user";

  /**
   * Find a user by their email in the database.
   *
   * This function retrieves a user record from the database based on the provided email.
   * The email is first formatted to lowercase for case-insensitive matching in the database.
   * A prepared query is constructed to select the user record with the matching email.
   * The query is then executed using the database client, and the result is checked to see if a user was found.
   * If a user record is found, it is returned as the result. Otherwise, null is returned.
   *
   * @function findByEmail
   * @memberof User
   * @param {string} email - The email of the user to find.
   * @returns {Object|null} - The user record if found, or null if not found.
   */
  async findByEmail(email) {
    // Format the email to lowercase for case-insensitive matching in the database.
    const formatedEmail = email.toLowerCase();

    // Prepare the query to select the user record with the matching email.
    const preparedQuery = {
      text: `SELECT * FROM "${this.tableName}" WHERE email = $1`,
      values: [formatedEmail],
    };

    // Execute the query using the database client.
    const resultQuery = await this.client.query(preparedQuery);

    // Check if a user record was found and return it, otherwise return null.
    if (resultQuery.rows[0]) {
      return resultQuery.rows[0];
    }
    return null;
  }
}

export default User;
