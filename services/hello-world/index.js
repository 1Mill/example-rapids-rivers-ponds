const { applicationData } = require('./utilities/cloudevents/applicationData')
const { subscribe } = require('./utilities/subscribe');

subscribe({
	handler: ({ cloudevent }) => {
		const data = applicationData({ cloudevent });
		if (data === '') { console.log('THIS THING IS EMPTY!') }
		console.log(data);
	},
	topic: 'hello-world',
});
