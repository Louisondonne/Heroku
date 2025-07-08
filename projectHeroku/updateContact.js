require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

async function updateContact(id, newEmail) {
  try {
    const res = await pool.query(
      'UPDATE contacts SET email = $1 WHERE id = $2 RETURNING *',
      [newEmail, id]
    );
    console.log('Contact MAJ :', res.rows[0]);
  } catch (err) {
    console.error('error maj :', err);
  } finally {
    await pool.end();
  }
}
updateContact(1, 'new.email@example.com');
