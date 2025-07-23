import { Client } from 'pg';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Optional: You can add an interface/type for config if you want more safety

const client = new Client({
  connectionString: process.env.DATABASE_URL,
});

client.connect()
  .then(() => console.log('Connected to the database!'))
  .catch((err) => console.error('Database connection error:', err));

client.query('SELECT NOW()')
  .then(res => {
    console.log('Test query result:', res.rows[0]);
  })
  .catch(err => {
    console.error('Test query failed:', err);
  });

export default client;