const { Kafka } = require('kafkajs');

const CLIENT_ID = 'hello-world-service';
const KAFKA = new Kafka({
	brokers: [process.env.RAPIDS_URL],
	clientId: CLIENT_ID,
});

const publish = async ({ id, payloads=[ '' ], topic }) => {
	const { connect, disconnect, send } = KAFKA.producer();
	await connect();
	await send({
		messages: payloads.map((payload) => ({
			headers: { contentType: 'application/cloudevents+json;charset=UTF-8' },
			// https://github.com/cloudevents/spec/blob/master/kafka-protocol-binding.md#334-example
			value: JSON.stringify({
				data: JSON.stringify(payload),
				datacontenttype: 'application/json',
				id,
				specversion: '1.0',
				time: new Date().toISOString(),
			}),
		})),
		topic,
	});
	await disconnect();
};

module.exports = { publish };
