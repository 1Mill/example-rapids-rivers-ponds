const { publish } = require('./utilities/publish');

console.log('Publishing');
publish({
	id: 'my-uuid-back-to-user-who-made-the-request',
	payloads: [
		'testing-1',
		'testing-2',
		'testing-3',
	],
	topic: 'hello-world',
});
console.log('Finished');
