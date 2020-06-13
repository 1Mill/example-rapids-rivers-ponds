const { WATERWAY_TYPE_KAFKA, waterway } = require('@1mill/waterway');

const ID = 'text-message-service';
const TOPICS = ['text-messages'];

const main = async () => {
	try {
		const event = {
			message: {
				value: JSON.stringify({
					textMessages: [
						"Hello",
						"How arae you?",
						"I am doing well. Thanks!",
						"Great to hear!",
					],
				}),
			},
			topic: TOPICS[0],
		};
		waterway({
			id: ID,
			type: WATERWAY_TYPE_KAFKA,
			url: process.env.RAPIDS_URL,
		}).publish({ event });
	} catch (err) {
		console.err(err);
	}
};

const MILISECONDS_PER_MINUTE = 60000;
const WAIT_MINUTES = 0.5;
setInterval(() => {
	console.log('Publishing');
	main();
}, WAIT_MINUTES * MILISECONDS_PER_MINUTE);
