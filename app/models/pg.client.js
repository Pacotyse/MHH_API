import dotenv from 'dotenv';
import pg from 'pg';

dotenv.config();

const client = new pg.Client({
    host: process.env.PG_HOST,
    user: process.env.PG_USER,
    database: process.env.PG_DB,
    password: process.env.PG_PASSWORD
});

client.connect((err) => {
  if (err) throw err;
  console.log('Connecté à la base de données PostgreSQL !');
});

export default client;