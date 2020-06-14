const { subscribe } = require('./utilities/subscribe');

subscribe({
	handler: ({ data }) => {
		console.log(data);
	},
	topic: 'hello-world',
});
