const { KAFKA_EVENTTYPE, subscribe } = require('@1mill/cloudevents');

const ID = 'hello-world-service';

subscribe({
	eventType: KAFKA_EVENTTYPE,
	handler: async ({ cloudevent, data, enrichment, isEnriched }) => {
		if (isEnriched) { return; }
		console.log(data);
		return data.split('').reverse().join('');
	},
	id: ID,
	publishTo: [ process.env.RAPIDS_URL ],
	subscribeTo: [ process.env.RAPIDS_URL ],
	type: 'hello-world-2020-06-14',
});
