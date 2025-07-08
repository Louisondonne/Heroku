require('dotenv').config();
const { Client } = require('pg');

async function insertContact(firstName, lastName, email) {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
  });

  await client.connect();

  await client.query(
    `INSERT INTO contacts (first_name, last_name, email) VALUES ($1, $2, $3)`,
    [firstName, lastName, email]
  );

  console.log('Contact add !');
  await client.end();
}

