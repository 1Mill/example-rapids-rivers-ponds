const { KAFKA_EVENTTYPE, subscribe } = require('@1mill/cloudevents');

const ID = 'hello-world-service';

subscribe({
	eventType: KAFKA_EVENTTYPE,
	handler: async ({ cloudevent, data, isEnriched }) => {
		if (isEnriched) { return; }

		const enrichment = data.split('').reverse().join('')
		console.log(`Turn "${data}" into "${enrichment}"`);
		return enrichment;
	},
	id: ID,
	publishTo: [ process.env.RAPIDS_URL ],
	subscribeTo: [ process.env.RAPIDS_URL ],
	type: 'hello-world-2020-06-14',
});
