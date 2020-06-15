const { KAFKA_EVENT_TYPE, publish } = require('./utilities/publish');
const { enrich } = require('./utilities/cloudevents/enrich');
const { isEnriched } = require('./utilities/cloudevents/isEnriched');
const { subscribe } = require('./utilities/subscribe');
const { toKafkaEvent } = require('./utilities/cloudevents/toKafkaEvent');

const ID = 'hello-world-service';

subscribe({
	brokers: [ process.env.RAPIDS_URL ],
	eventType: KAFKA_EVENT_TYPE,
	handler: async ({ cloudevent }) => {
		// Escape clauses
		// TODO: Abstract enrichment check into framework
		if (isEnriched({ cloudevent })) { return; }

		// Fetch buisness data
		// TODO: Abstract data parsing into framework;
		const data = JSON.parse(cloudevent.data);

		// Perform buisness / domain logic
		console.log(data);
		const enrichment = data.split('').reverse().join('');
		console.log(enrichment);

		// Enrich event
		// TODO: Abstract enrichment work into framework with
		// TODO: value returned from buisness / domain logic
		const enrichedCloudevent = enrich({
			cloudevent,
			enrichment,
		});

		// Publish enriched event
		// TODO: Abstract publishing work into framework
		await publish({
			brokers: [ process.env.RAPIDS_URL ],
			event: toKafkaEvent({ cloudevent: enrichedCloudevent }),
			eventType: KAFKA_EVENT_TYPE,
			id: ID,
		});
	 },
	id: ID,
	type: 'hello-world-2020-06-14',
});

