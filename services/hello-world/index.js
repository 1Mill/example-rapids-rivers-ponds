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
		if (isEnriched({ cloudevent })) { return; }

		// Fetch application data

		// Perform buisness / domain logic

		// Enrich event
		const enrichedCloudevent = enrich({
			cloudevent,
			enrichment: 'testing',
		});

		// Publish enriched event
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

