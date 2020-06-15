const { enrich } = require('./utilities/cloudevents/enrich');
const { subscribe } = require('./utilities/subscribe');

subscribe({
	brokers: [ process.env.RAPIDS_URL ],
	eventType: 'kafka',
	handler: ({ cloudevent }) => {
		const enrichedCloudevent = enrich({
			cloudevent,
			enrichment: 'testing',
		});
		console.log(enrichedCloudevent.id);
		// console.log(enrichedCloudevent.source);
		// console.log(enrichedCloudevent.time);
		// console.log(enrichedCloudevent.type);
		// console.log(enrichedCloudevent.data);
		// console.log(JSON.parse(enrichedCloudevent.data));
		console.log(enrichedCloudevent.enrichment);
		console.log(JSON.parse(enrichedCloudevent.enrichment));
	 },
	id: 'hello-world-service',
	type: 'hello-world-2020-06-14',
});

