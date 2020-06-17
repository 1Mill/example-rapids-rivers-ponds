const { KAFKA_EVENTTYPE, subscribe } = require('@1mill/cloudevents');

const ID = 'hello-world-service';

subscribe({
	brokers: [ process.env.RAPIDS_URL ],
	eventType: KAFKA_EVENTTYPE,
	handler: async ({ data, enrichment, isEnriched }) => {
		if (isEnriched) { return; }
		return data.split('').reverse().join('');
	},
	id: ID,
	type: 'hello-world-2020-06-14',
});
