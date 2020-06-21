const { Pool } = require('pg');
const pool = new Pool();
pool.connect();

const query = async ({ text, values }) => {
	const { rows } = await pool.query({
		text,
		values,
	 });
	return rows;
};

module.exports = { query };
