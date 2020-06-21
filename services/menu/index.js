const { KAFKA_EVENTTYPE, subscribe } = require('@1mill/cloudevents');

subscribe({
	handler: async ({ isEnriched }) => {
		if (isEnriched) { return; }
	},
	id: 'services.menu',
	publishEventType: KAFKA_EVENTTYPE,
	publishTo: [ process.env.RAPIDS_URL ],
	subscribeEventType: KAFKA_EVENTTYPE,
	subscribeTo: [ process.env.RAPIDS_URL ],
	types: [ 'add-menu-item.2020-21-06' ],
});
