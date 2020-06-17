const { KAFKA_EVENTTYPE, subscribe } = require('@1mill/cloudevents');

const ID = 'company-history-awards-service';

subscribe({
	// eventType: KAFKA_EVENTTYPE,
	// handler: async ({ cloudevent, data, enrichment, isEnriched }) => {
	// 	if (isEnriched) { return; }

	// 	const enrichmentValue = data.split('').reverse().join('')
	// 	console.log(`Turn "${data}" into "${enrichmentValue}"`);
	// 	return enrichmentValue;
	// },
	// id: ID,
	// publishTo: [ process.env.RAPIDS_URL ],
	// subscribeTo: [ process.env.RAPIDS_URL ],
	// type: 'hello-world-2020-06-14',
});
