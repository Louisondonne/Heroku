require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

async function readContacts() {
  try {
    const res = await pool.query('SELECT * FROM contacts ORDER BY id');
    console.table(res.rows);
  } catch (err) {
    console.error('Error read contact', err);
  } finally {
    await pool.end();
  }
}

readContacts();
