const { publish } = require('./utilities/publish');
const { subscribe } = require('./utilities/subscribe');

console.log('Publishing');
publish({
	payloads: [ 'testing' ],
	id: 'my-uuid-back-to-user-who-made-the-request',
	topic: 'hello-world',
});
subscribe({
	id: 'my-uuid-back-to-user-who-made-the-request',
	topic: 'hello-world',
});
console.log('Finished');
