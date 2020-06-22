const { KAFKA_EVENTTYPE, subscribe } = require('@1mill/cloudevents');

subscribe({
	handler: async ({ isEnriched }) => {
		try {
			if (isEnriched) { return; }
			console.log('testing');
		} catch (err) {
			console.error(err);
		}
	},
	id: 'services.tabs.root',
	publishEventType: KAFKA_EVENTTYPE,
	publishTo: [ process.env.RAPIDS_URL ],
	subscribeEventType: KAFKA_EVENTTYPE,
	subscribeTo: [ process.env.RAPIDS_URL ],
	types: [
		'open-tab.2020-06-21',
	],
});
