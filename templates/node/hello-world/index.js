const { KAFKA_EVENTTYPE, subscribe } = require('@1mill/cloudevents');

subscribe({
	handler: async ({ data, isEnriched }) => {
		if (isEnriched) { return; }

		const enrichmentValue = data.split('').reverse().join('')
		console.log(`Turn "${data}" into "${enrichmentValue}"`);
		return enrichmentValue;
	},
	id: 'services.hello-world',
	publishEventType: KAFKA_EVENTTYPE,
	publishTo: [ process.env.RAPIDS_URL ],
	subscribeEventType: KAFKA_EVENTTYPE,
	subscribeTo: [ process.env.RAPIDS_URL ],
	types: [ 'hello-world.2020-06-19' ],
});
