require('dotenv').config();
const { Client } = require('pg');

async function deleteContact(id) {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
  });

  try {
    await client.connect();
    const result = await client.query(
      'DELETE FROM contacts WHERE id = $1 RETURNING *',
      [id]
    );

    if (result.rowCount === 0) {
      console.log('NO ${id} ');
    } else {
      console.log('delete', result.rows[0]);
    }
  } catch (err) {
    console.error('error delete', err.message);
  } finally {
    await client.end();
  }
}

deleteContact(37);
