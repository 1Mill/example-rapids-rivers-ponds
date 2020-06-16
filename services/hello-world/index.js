const {
	KAFKA_EVENTTYPE,
	enrich,
	isEnriched,
	publish,
	subscribe,
	toEventType,
} = require('@1mill/cloudevents');

const ID = 'hello-world-service';

subscribe({
	brokers: [ process.env.RAPIDS_URL ],
	eventType: KAFKA_EVENTTYPE,
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
			event: toEventType({
				cloudevent: enrichedCloudevent,
				eventType: KAFKA_EVENTTYPE,
			}),
			eventType: KAFKA_EVENTTYPE,
			id: ID,
		});
	 },
	id: ID,
	type: 'hello-world-2020-06-14',
});

