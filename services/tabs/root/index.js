const { KAFKA_EVENTTYPE, subscribe } = require('@1mill/cloudevents');
const { MongoClient } = require('mongodb');

const databaseUrl = `mongodb://${process.env.DATABASE_USERNAME}:${process.env.DATABASE_PASSWORD}@${process.env.DATABASE_HOST}:${process.env.DATABASE_PORT}`;
const client = new MongoClient(databaseUrl);

const main = async () => {
	try {
		await client.connect();
		const db = client.db(process.env.DATABASE_NAME);
		const collection = db.collection('tabs');

		subscribe({
			handler: async ({ isEnriched }) => {
				try {
					if (isEnriched) { return; }
					return 'testing';
				} catch (err) {
					console.error(err);
				}
			},
			id: 'services.tabs.root',
			publishEventType: KAFKA_EVENTTYPE,
			publishTo: [process.env.RAPIDS_URL],
			subscribeEventType: KAFKA_EVENTTYPE,
			subscribeTo: [process.env.RAPIDS_URL],
			types: ['open-tab.2020-06-21'],
		});
	} catch (err) {
		console.error(err);
	}
};
main();
