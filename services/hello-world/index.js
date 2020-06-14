const { getData } = require('./utilities/cloudevents/getData')
const { subscribe } = require('./utilities/subscribe');

subscribe({
	handler: ({ cloudevent }) => {
		const data = getData({ cloudevent });
		if (data === '') { console.log('THIS THING IS EMPTY!') }
		console.log(data);
	},
	topic: 'hello-world',
});
