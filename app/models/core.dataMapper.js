class CoreDatamapper {
    tableName;
  
    constructor(client) {
      this.client = client;
    }
  
    /**
           * Récupération par identifiant
           * @param {number} id identifiant
           * @returns {object} un enregistrement
           */
  
    async findByPk(id) {
      const preparedQuery = {
        text: `SELECT * FROM "${this.tableName}" WHERE id = $1`,
        values: [id],
      };
  
      const result = await this.client.query(preparedQuery);
  
      if (!result.rows[0]) {
        return null;
      }
  
      return result.rows[0];
    }
  
    /**
           * Permet de récupérer l'ensemble des enregistrement
           * d'une table ou une liste d'enregistrement.
           * @returns {object[]} une liste d'enregistrements
           */
  
    async findAll() {
      const result = await this.client.query(`SELECT * FROM "${this.tableName}"`);
  
      return result.rows;
    }

    /**
           * Insertion de données dans la table
           * @param {object} inputData données à insérer dans la table
           * @returns {object} l'enregistrement créé
           */
    async create(inputData) {
      const fields = [];
      const placeholders = [];
      const values = [];
      let indexPlaceholder = 1;
  
      Object.entries(inputData).forEach(([prop, value]) => {
        fields.push(`"${prop}"`);
        placeholders.push(`$${indexPlaceholder}`);
        indexPlaceholder += 1;
        values.push(value);
      });
  
      const preparedQuery = {
        text: `
              INSERT INTO "${this.tableName}"
              (${fields})
              VALUES (${placeholders})
              RETURNING *
            `,
        values,
      };
  
      const result = await this.client.query(preparedQuery);
      const row = result.rows[0];
  
      return row;
    }
  
    /**
           * Modification de données dans la table
           * @param {object} param0 données à mettre à jour dans la table comprenant également
           * l'identifiant de l'enregistrement
           * @returns {object} l'enregistrement mis à jour
           */
  
    async update({ id, ...inputData }) {
      const fieldsAndPlaceholders = [];
      let indexPlaceholder = 1;
      const values = [];
  
      Object.entries(inputData).forEach(([prop, value]) => {
        fieldsAndPlaceholders.push(`"${prop}" = $${indexPlaceholder}`);
        indexPlaceholder += 1;
        values.push(value);
      });
  
      values.push(id);
  
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
  
      const result = await this.client.query(preparedQuery);
      const row = result.rows[0];
  
      return row;
    }
  
    /**
           * Suppression d'un enregistrement
           * @param {number} id
           * @returns {boolean} nombre d'enregistrement supprimés
          */
  
    async delete(id) {
      const result = await this.client.query(`DELETE FROM "${this.tableName}" WHERE id = $1`, [id]);
      // !! cast un falsy en false
      return !!result.rowCount;
    }
  };

export default CoreDatamapper;