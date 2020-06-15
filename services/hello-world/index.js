const { enrich } = require('./utilities/cloudevents/enrich');
const { getData } = require('./utilities/cloudevents/getData');
const { subscribe } = require('./utilities/subscribe');

subscribe({
	brokers: [ process.env.RAPIDS_URL ],
	eventType: 'kafka',
	handler: ({ cloudevent }) => { console.log('Something happened'); },
	id: 'hello-world-service',
	type: 'hello-world-2020-06-14',
});

