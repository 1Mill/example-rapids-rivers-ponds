const { KAFKA_EVENTTYPE, subscribe } = require('@1mill/cloudevents');

const ID = 'company-employes-index-service';

subscribe({
	eventType: KAFKA_EVENTTYPE,
	handler: async ({ isEnriched }) => {
		if (isEnriched) { return; }
		return [
			{
				description: 'I do the stuff with the things',
				id: '1234',
				name: 'Donald Smith',
				title: 'Software engineer',
			},
		]
	},
	id: ID,
	publishTo: [ process.env.RAPIDS_URL ],
	subscribeTo: [ process.env.RAPIDS_URL ],
	types: [ 'company-employes.index.2020-06-18' ],
});
