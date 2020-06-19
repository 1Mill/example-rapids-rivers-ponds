const { KAFKA_EVENTTYPE, subscribe } = require('@1mill/cloudevents');

const ID = 'company-employes-index-service';

subscribe({
	handler: async ({ isEnriched }) => {
		if (isEnriched) {
			return;
		}
		return [
			{
				description: 'I do the stuff with the things',
				id: '1234',
				name: 'Donald Smith',
				title: 'Software engineer',
			},
		];
	},
	id: ID,
	publishEventType: KAFKA_EVENTTYPE,
	publishTo: [process.env.RAPIDS_URL],
	subscribeEventType: KAFKA_EVENTTYPE,
	subscribeTo: [process.env.RAPIDS_URL],
	types: ['company-employes.index.2020-06-18'],
});
