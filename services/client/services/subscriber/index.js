const { KAFKA_EVENT_TYPE } = require('./lib/constants');
const { isEnriched } = require('./utilities/cloudevents/isEnriched');
const { subscribe } = require('./utilities/subscribe');

subscribe({
	brokers: [process.env.RAPIDS_URL],
	eventType: KAFKA_EVENT_TYPE,
	handler: async ({ cloudevent }) => {
		// Escape clauses
		// TODO: Abstract not enrichment check into framework
		if (!isEnriched({ cloudevent })) { return; }

		// Fetch buisness data
		// TODO: Abstract data parsing into framework;
		const data = JSON.parse(cloudevent.data);
		const enrichment = JSON.parse(cloudevent.enrichment);

		// Perform buisness / domain logic
		console.log(data);
		console.log(enrichment);
	},
	id: 'client-subscriber-service',
	type: 'hello-world-2020-06-14',
});
