const { Client } = require('pg');
const { KAFKA_EVENTTYPE, subscribe } = require('@1mill/cloudevents');

const client = new Client({
	database: process.env.DATABASE_NAME,
	host: process.env.DATABASE_HOST,
	password: process.env.DATABASE_PASSWORD,
	port: process.env.DATABASE_PORT,
	user: process.env.DATABASE_USERNAME,
});

const main = async () => {
	try {
		await client.connect();

		const insert = {
			text: 'INSERT INTO tabs(table_number, waiter) VALUES($1, $2) RETURNING *',
			values: ["1234", "Erik"],
		};
		await client.query(insert);

		subscribe({
			handler: async ({ data }) => {
				const {
					tableNumber = null,
					waiter = null,
				} = data;
				const tab = {
					id: Math.ceil(Math.random() * 100000),
					tableNumber,
					waiter,
				};
				console.log(tab);

				const { rows } = await client.query('SELECT table_number, waiter FROM tabs');
				console.log(rows);
				console.log('event fired');
			},
			id: "services.open-tab",
			publishEventType: KAFKA_EVENTTYPE,
			publishTo: [process.env.RAPIDS_URL],
			subscribeEventType: KAFKA_EVENTTYPE,
			subscribeTo: [process.env.RAPIDS_URL],
			types: ["open-tab.2020-06-20"],
		});
	} catch (err) {
		console.error(err);
	}
};

main();
