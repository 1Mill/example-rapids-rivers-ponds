const { getData } = require('./utilities/cloudevents/getData');
const { subscribe } = require('./utilities/subscribe');

subscribe({
	handler: ({ cloudevent }) => {
		// Parse data
		const data = getData({ cloudevent });

		// Buisness / Domain logic
		if (data === '') { return; }
		console.log(data);

		// Enrich event

		// Publish enriched event to rapids
	},
	topic: 'hello-world',
});
