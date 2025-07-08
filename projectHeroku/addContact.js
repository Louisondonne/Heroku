require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

async function insertContact(firstName, lastName, email) {
  const client = await pool.connect();
  try {
    const result = await client.query(
      'INSERT INTO contacts (first_name, last_name, email) VALUES ($1, $2, $3) RETURNING id',
      [firstName, lastName, email]
    );
    console.log(`Ajout ID: ${result.rows[0].id}`);
  } catch (err) {
    console.error('Error insert', err);
  } finally {
    client.release();
  }
}

async function run() {
  await insertContact('Jean', 'Pierre', 'jean.Pierre@example.com');
  await insertContact('jose', 'pas', 'jose.pas@example.com');
  await insertContact('jean', 'Michel', 'jean.michel@example.com');
    await insertContact('Jean', 'Nèmarre', 'jean.nemarre@example.com');

}

run().catch(console.error);
