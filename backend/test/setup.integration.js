require('dotenv').config({ path: '.env.test' });

const { pool } = require('../src/config/database');
const UserModel = require('../src/models/userModel');

beforeAll(async () => {
  console.log('Setting up integration test database...');
  await UserModel.createTable();
});

beforeEach(async () => {
  await pool.query('DELETE FROM users');
});

afterAll(async () => {
  console.log('Cleaning up database connection...');
  try {
    await pool.end();
  } catch (err) {
    if (!err.message?.includes('Called end on pool more than once')) {
      console.error('Error closing pool:', err);
    }
  }
});