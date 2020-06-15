const { KAFKA_EVENT_TYPE } = require('./lib/constants');
const { subscribe } = require('./utilities/subscribe');

subscribe({
	brokers: [process.env.RAPIDS_URL],
	eventType: KAFKA_EVENT_TYPE,
	handler: async ({ cloudevent }) => {
		console.log('data: ', JSON.parse(cloudevent.data));
		if (cloudevent.enrichment) {
			console.log('enrichment: ', JSON.parse(cloudevent.enrichment));
		}
	},
	id: 'client-subscriber-service',
	type: 'hello-world-2020-06-14',
});
