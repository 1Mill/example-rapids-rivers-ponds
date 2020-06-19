const { KAFKA_EVENTTYPE, subscribe } = require('@1mill/cloudevents');

const ID = 'company-employes-index-service';

subscribe({
	eventType: KAFKA_EVENTTYPE,
	handler: async ({ isEnriched }) => {
		if (isEnriched) { return; }
		return 'testing';
	},
	id: ID,
	publishTo: [ process.env.RAPIDS_URL ],
	subscribeTo: [ process.env.RAPIDS_URL ],
	types: [ 'company-employes.index.2020-06-18' ],
});
