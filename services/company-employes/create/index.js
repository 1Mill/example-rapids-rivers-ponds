const assert = require('assert');
const { KAFKA_EVENTTYPE, subscribe } = require('@1mill/cloudevents');
const { MongoClient } = require('mongodb');

const ID = 'company-employes-index-service';

const client = new MongoClient(process.env.DATABASE_URL);
const main = async () => {
	try {
		await client.connect();
		const db = client.db(process.env.DATABASE_NAME);
		const collection = db.collection('employees');

		subscribe({
			handler: async ({ isEnriched }) => {
				if (isEnriched) { return; }

				console.log('Create new employees!');
			},
			id: ID,
			publishEventType: KAFKA_EVENTTYPE,
			publishTo: [process.env.RAPIDS_URL],
			subscribeEventType: KAFKA_EVENTTYPE,
			subscribeTo: [process.env.RAPIDS_URL],
			types: ['company-employes.create.2020-06-19'],
		});
	} catch (err) {
		console.error(err);
	}
};

main();

process.on('SIGINT', () => {
	client.close();
	console.log('Closed connection to database');
	process.exit(0);
})
