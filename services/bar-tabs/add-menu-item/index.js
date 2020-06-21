const { KAFKA_EVENTTYPE, subscribe } = require('@1mill/cloudevents');
const { query } = require('./utilities/database/query');

subscribe({
	handler: async ({ isEnriched }) => {
		if (isEnriched) { return; }

		const results = await query({
			text: 'SELECT * from tabs'
		});
		console.log(results)

		console.log('adding item')
	},
	id: 'services.bar-tabs.add-menu-item',
	publishEventType: KAFKA_EVENTTYPE,
	publishTo: [ process.env.RAPIDS_URL ],
	subscribeEventType: KAFKA_EVENTTYPE,
	subscribeTo: [ process.env.RAPIDS_URL ],
	types: [ 'add-menu-item.2020-21-06' ],
});
