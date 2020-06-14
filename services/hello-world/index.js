const { WATERWAY_TYPE_KAFKA, waterway } = require("@1mill/waterway");

const ID = 'hello-world-service';
const TOPICS = ['hello-world'];

const main = async() => {
	try {
		waterway({
			id: ID,
			type: WATERWAY_TYPE_KAFKA,
			url: process.env.RAPIDS_URL,
		}).subscribe({
			onEvent: ({ event }) => {
				const value = JSON.parse(event.message.value);
				const data = JSON.parse(value.data);
				console.log('Cloud Event data: ', data);
			},
			topics: TOPICS,
		})
	} catch (err) {
		console.error(err);
	}
};

main();
