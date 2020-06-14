const { subscribe } = require('./utilities/subscribe');

console.log('Subscribing');
subscribe({
	id: 'my-uuid-back-to-user-who-made-the-request',
	topic: 'hello-world-2020-06-14',
});
console.log('Finished');
