
import sqlite from 'sqlite3';
// open the database
const db = new sqlite.Database('questions.sqlite', (err) => {
  if (err) throw err;
});

export default db;