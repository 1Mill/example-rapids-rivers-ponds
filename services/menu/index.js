const { KAFKA_EVENTTYPE, subscribe } = require('@1mill/cloudevents');
const { MENU_ITEMS } = require('./lib/menu-items');

subscribe({
	handler: async ({ isEnriched }) => {
		if (isEnriched) { return; }
		return MENU_ITEMS;
	},
	id: 'services.menu',
	publishEventType: KAFKA_EVENTTYPE,
	publishTo: [ process.env.RAPIDS_URL ],
	subscribeEventType: KAFKA_EVENTTYPE,
	subscribeTo: [ process.env.RAPIDS_URL ],
	types: [ 'list-menu-items.2020-21-06' ],
});
