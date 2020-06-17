const { KAFKA_EVENTTYPE } = require('../lib/constants');
const { Kafka } = require('kafkajs');

const publish = async ({ event, eventType, id, publishTo }) => {
	// TODO: Abstract to support more event types (e.g. rabbmitmq)
	if (eventType !== KAFKA_EVENTTYPE) { throw Error('invalid event type'); }

	const kafka = new Kafka({
		brokers: publishTo,
		clientId: id,
	});
	const { connect, disconnect, send } = kafka.producer();
	await connect();
	await send(event);
	await disconnect();
};

module.exports = { publish };
