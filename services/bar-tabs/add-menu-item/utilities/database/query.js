const { Pool } = require("pg");
const pool = new Pool({
	database: process.env.DATABASE_NAME,
	host: process.env.DATABASE_HOST,
	password: process.env.DATABASE_PASSWORD,
	port: process.env.DATABASE_PORT,
	user: process.env.DATABASE_USERNAME,
});
pool.connect();

const query = async ({ text, values }) => {
	const { rows } = await pool.query({
		text,
		values,
	});
	return rows;
};

module.exports = { query };
