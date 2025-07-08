require('dotenv').config();
const { Pool } = require('pg');
const fs = require('fs');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

async function exportContacts() {
  try {
    const res = await pool.query('SELECT * FROM contacts ORDER BY id');
    const header = 'id,first_name,last_name,email,created_at\n';
    const csv = res.rows.map(r => 
      `${r.id},"${r.first_name}","${r.last_name}","${r.email}","${r.created_at.toISOString()}"`
    ).join('\n');
    
    fs.writeFileSync('contacts_export.csv', header + csv);
    console.log('Export CSV  contacts_export.csv');
  } catch (err) {
    console.error('error export :', err);
  } finally {
    await pool.end();
  }
}

exportContacts();
