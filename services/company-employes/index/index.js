const assert = require('assert');
const { KAFKA_EVENTTYPE, subscribe } = require('@1mill/cloudevents');
const { MongoClient } = require('mongodb');

const ID = 'company-employes-index-service';

const client = new MongoClient(process.env.DATABASE_URL)
client.connect((err) => {
	assert.equal(null, err)
	console.log('Connected successfully to database')
	const db = client.db(process.env.DATABASE_NAME)

	subscribe({
		handler: async ({ isEnriched }) => {
			if (isEnriched) {
				return;
			}
			return [
				{
					description: 'I do the stuff with the things',
					id: '1234',
					name: 'Donald Smith',
					title: 'Software engineer',
				},
			];
		},
		id: ID,
		publishEventType: KAFKA_EVENTTYPE,
		publishTo: [process.env.RAPIDS_URL],
		subscribeEventType: KAFKA_EVENTTYPE,
		subscribeTo: [process.env.RAPIDS_URL],
		types: ['company-employes.index.2020-06-18'],
	});
});

process.on('SIGINT', () => {
	client.close();
	console.log('Closed connection to database');
	process.exit(0);
})
