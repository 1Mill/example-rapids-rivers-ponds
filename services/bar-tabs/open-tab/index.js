const { KAFKA_EVENTTYPE, subscribe } = require('@1mill/cloudevents');

subscribe({
	handler: async ({ data }) => {
		const {
			tableNumber = null,
			waiter = null,
		} = data;
		const tab = {
			id: Math.ceil(Math.random() * 100000),
			tableNumber,
			waiter,
		};
		console.log(tab);
	},
	id: 'services.open-tab',
	publishEventType: KAFKA_EVENTTYPE,
	publishTo: [ process.env.RAPIDS_URL ],
	subscribeEventType: KAFKA_EVENTTYPE,
	subscribeTo: [ process.env.RAPIDS_URL ],
	types: [ 'open-tab.2020-06-20' ],
});
