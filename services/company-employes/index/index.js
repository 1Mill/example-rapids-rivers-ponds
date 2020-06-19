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

		// Remove all records from database
		collection.deleteMany({});

		// Seed database
		const records = [
			{
				description: 'I do the stuff with the things',
				id: '1234',
				name: 'John Doe',
				title: 'Software engineer',
			},
			{
				description: 'I do the stuff with the things',
				id: '1233',
				name: 'Jane Doe',
				title: 'Software engineer',
			},
		];
		await collection.insertMany(records);

		subscribe({
			handler: async ({ isEnriched }) => {
				if (isEnriched) { return; }

				const results = collection
					.find({ title: 'Software engineer' })
					.toArray();
				return results;
			},
			id: ID,
			publishEventType: KAFKA_EVENTTYPE,
			publishTo: [process.env.RAPIDS_URL],
			subscribeEventType: KAFKA_EVENTTYPE,
			subscribeTo: [process.env.RAPIDS_URL],
			types: ['company-employes.index.2020-06-18'],
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
