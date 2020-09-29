const {Pool} = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});
const _ = require('lodash');

const query = (text, params) => pool.query(text, params);

const isCounterTableExists = async () => {
  const result = await query(
    "SELECT * FROM pg_catalog.pg_tables where tablename='counters';",
  );

  return result.rowCount > 0;
};

const createCounterTable = async () => {
  try {
    await query(
      'CREATE TABLE counters (counter_id serial PRIMARY KEY, count integer NOT NULL);',
    );
    await query('INSERT INTO counters VALUES (0, 0);');
  } catch (e) {
    console.error('There was an error while creating the counter table', e);
  }
};

const increaseCounter = () =>
  query('UPDATE counters SET count=count+1 WHERE counter_id=0');

const getCounter = async () => {
  const result = await query('SELECT count FROM counters');
  return _.get(result, 'rows[0].count', 0);
};

module.exports = {
  isCounterTableExists,
  createCounterTable,
  increaseCounter,
  getCounter,
};
