const { KAFKA_EVENTTYPE, subscribe } = require('@1mill/cloudevents');
const { query } = require('./utilities/database/query');

const main = async () => {
	try {
		// Seed database on startup
		await query({
			text: 'INSERT INTO tabs(table_number, waiter) VALUES($1, $2) RETURNING *',
			values: ['4321', 'Some name'],
		});

		subscribe({
			handler: async ({ data }) => {
				// const {
				// 	tableNumber = null,
				// 	waiter = null,
				// } = data;
				// const tab = {
				// 	id: Math.ceil(Math.random() * 100000),
				// 	tableNumber,
				// 	waiter,
				// };
				// console.log(tab);

				console.log('event fired');
				const results = await query({ text: 'SELECT table_number, waiter FROM tabs' });
				console.log(results);
			},
			id: 'services.open-tab',
			publishEventType: KAFKA_EVENTTYPE,
			publishTo: [process.env.RAPIDS_URL],
			subscribeEventType: KAFKA_EVENTTYPE,
			subscribeTo: [process.env.RAPIDS_URL],
			types: ['open-tab.2020-06-20'],
		});
	} catch (err) {
		console.error(err);
	}
};

main();
