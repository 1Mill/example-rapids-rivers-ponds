const { enrich } = require('./utilities/cloudevents/enrich');
const { getData } = require('./utilities/cloudevents/getData');
const { subscribe } = require('./utilities/subscribe');

subscribe({
	brokers: [ process.env.RAPIDS_URL ],
	eventType: 'kafka',
	handler: ({ cloudevent }) => {
		console.log(cloudevent.id);
		console.log(cloudevent.source);
		console.log(cloudevent.time);
		console.log(cloudevent.type);
		console.log(cloudevent.data);
		console.log(JSON.parse(cloudevent.data));
	 },
	id: 'hello-world-service',
	type: 'hello-world-2020-06-14',
});

