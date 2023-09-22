class CoreDatamapper {
  tableName;

  constructor(client) {
    this.client = client;
  }

  /**
   * Retrieve a record by its primary key (id).
   *
   * @async
   * @function findByPk
   * @param {number} id - The primary key (id) of the record to retrieve.
   * @returns {object|null} An object representing the retrieved record or null if no record is found.
   * @throws {Error} Throws an error if there's a problem with the database query.
   */
  async findByPk(id) {
    try {
      // Prepare the SQL query to retrieve a record by its primary key (id)
      const preparedQuery = {
        text: `SELECT * FROM "${this.tableName}" WHERE id = $1`,
        values: [id],
      };

      // Execute the query
      const result = await this.client.query(preparedQuery);

      // Check if a record was found
      if (!result.rows[0]) {
        return null; // No record found
      }

      return result.rows[0]; // Return the retrieved record as an object
    } catch (error) {
      throw new Error("Database query error: " + error.message);
    }
  }

  /**
   * Find a record in the database table based on a specified field and its value.
   *
   * @async
   * @function findBy
   * @param {string} field - The name of the field to search for.
   * @param {any} value - The value to match against in the specified field.
   * @returns {Promise<Object|null>} A Promise that resolves with the found record as an object, or null if no record is found.
   * @throws {Error} Throws an error if there's a problem with the database query.
   */
  async findBy(field, value) {
    try {
      // Prepare the SQL query
      const preparedQuery = {
        text: `SELECT * FROM "${this.tableName}" WHERE "${field}" = $1`,
        values: [value],
      };

      // Execute the query
      const result = await this.client.query(preparedQuery);

      // Check if a record was found
      if (!result.rows[0]) {
        return null; // No record found
      }

      return result.rows[0]; // Return the found record as an object
    } catch (error) {
      throw new Error("Database query error: " + error.message);
    }
  }

  /**
   * Retrieve all records from a table or a list of records.
   *
   * @async
   * @function findAll
   * @returns {object[]} An array containing a list of records.
   * @throws {Error} Throws an error if there's a problem with the database query.
   */
  async findAll() {
    try {
      // Execute an SQL query to retrieve all records from the specified table
      const result = await this.client.query(
        `SELECT * FROM "${this.tableName}"`
      );

      // Return the list of records as an array of objects
      return result.rows;
    } catch (error) {
      throw new Error("Database query error: " + error.message);
    }
  }

  /**
   * Insert data into the table.
   *
   * @async
   * @function create
   * @param {object} inputData - Data to be inserted into the table.
   * @returns {object} The created record.
   * @throws {Error} Throws an error if there's a problem with the database query.
   */
  async create(inputData) {
    try {
      // Prepare the fields, placeholders, and values for the SQL query
      const fields = [];
      const placeholders = [];
      const values = [];
      let indexPlaceholder = 1;

      // Iterate through the input data and build the query components
      Object.entries(inputData).forEach(([prop, value]) => {
        fields.push(`"${prop}"`);
        placeholders.push(`$${indexPlaceholder}`);
        indexPlaceholder += 1;
        values.push(value);
      });

      // Construct the SQL query for insertion
      const preparedQuery = {
        text: `
        INSERT INTO "${this.tableName}"
        (${fields})
        VALUES (${placeholders})
        RETURNING *
      `,
        values,
      };

      // Execute the query and retrieve the created record
      const result = await this.client.query(preparedQuery);
      const row = result.rows[0];

      // Return the created record as an object
      return row;
    } catch (error) {
      // Handle any database query errors with an informative message
      throw new Error("Database query error: " + error.message);
    }
  }

  /**
   * Update data in the table.
   *
   * @async
   * @function update
   * @param {object} inputData - Data to be updated in the table, including the record's identifier.
   * @returns {object} The updated record.
   * @throws {Error} Throws an error if there's a problem with the database query.
   */
  async update({ id, ...inputData }) {
    try {
      // Prepare fields, placeholders, and values for the SQL query
      const fieldsAndPlaceholders = [];
      let indexPlaceholder = 1;
      const values = [];

      // Iterate through the input data and build the query components
      Object.entries(inputData).forEach(([prop, value]) => {
        fieldsAndPlaceholders.push(`"${prop}" = $${indexPlaceholder}`);
        indexPlaceholder += 1;
        values.push(value);
      });

      // Add the record's identifier to the values array
      values.push(id);

      // Construct the SQL query for updating the record
      const preparedQuery = {
        text: `
        UPDATE "${this.tableName}" SET
        ${fieldsAndPlaceholders},
        updated_at = now()
        WHERE id = $${indexPlaceholder}
        RETURNING *
      `,
        values,
      };

      // Execute the query and retrieve the updated record
      const result = await this.client.query(preparedQuery);
      const row = result.rows[0];

      // Return the updated record as an object
      return row;
    } catch (error) {
      // Handle any database query errors with an informative message
      throw new Error("Database query error: " + error.message);
    }
  }

  /**
   * Delete a record.
   *
   * @async
   * @function delete
   * @param {number} id - The identifier of the record to delete.
   * @returns {boolean} True if the record was successfully deleted, false otherwise.
   * @throws {Error} Throws an error if there's a problem with the database query.
   */
  async delete(id) {
    try {
      // Execute an SQL query to delete a record by its identifier (id)
      const result = await this.client.query(
        `DELETE FROM "${this.tableName}" WHERE id = $1`,
        [id]
      );

      // Convert the result.rowCount to a boolean value: true if deleted, false otherwise
      return !!result.rowCount;
    } catch (error) {
      // Handle any database query errors with an informative message
      throw new Error("Database query error: " + error.message);
    }
  }
}

export default CoreDatamapper;
