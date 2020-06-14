const { applicationData } = require('./utilities/cloudevents/applicationData')
const { subscribe } = require('./utilities/subscribe');

subscribe({
	handler: ({ cloudevent }) => {
		console.log(applicationData({ cloudevent }));
	},
	topic: 'hello-world',
});
