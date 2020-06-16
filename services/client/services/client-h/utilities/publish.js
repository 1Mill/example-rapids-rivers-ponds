const { KAFKA_EVENT_TYPE } = require('../lib/constants');
const { Kafka } = require('kafkajs');

const publish = async ({ brokers, event, eventType, id }) => {
	// TODO: Abstract to support more event types (e.g. rabbmitmq)
	if (eventType !== KAFKA_EVENT_TYPE) { throw Error('invalid event type'); }

	const kafka = new Kafka({
		brokers,
		clientId: id,
	});
	const { connect, disconnect, send } = kafka.producer();
	await connect();
	await send({ ...event });
	await disconnect();
};

module.exports = { KAFKA_EVENT_TYPE, publish };
