const { publish } = require('./utilities/publish');

console.log('Publishing');
publish({
	id: 'my-uuid-back-to-user-who-made-the-request',
	payloads: [ 'testing' ],
	topic: 'hello-world',
});
console.log('Finished');
