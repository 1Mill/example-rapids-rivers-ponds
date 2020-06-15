const { enrich } = require('./utilities/cloudevents/enrich');
const { isEnriched } = require('./utilities/cloudevents/isEnriched');
const { subscribe } = require('./utilities/subscribe');

subscribe({
	brokers: [ process.env.RAPIDS_URL ],
	eventType: 'kafka',
	handler: ({ cloudevent }) => {
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

	 },
	id: 'hello-world-service',
	type: 'hello-world-2020-06-14',
});

