const { ERROR_TYPES, KAFKA_EVENTTYPE, SIGNAL_TRAPS } = require('../lib/constants');
const { Kafka } = require('kafkajs');
const { fromEventType } = require('./fromEventType');

const subscribe = async ({ brokers, eventType, handler, id, type }) => {
	// TODO: Support other event types (e.g. rabbitmq)
	if (eventType !== KAFKA_EVENTTYPE) {
		throw Error("Invalid event type");
	}

	const kakfa = new Kafka({
		brokers,
		clientId: id,
	});
	const {
		connect,
		disconnect,
		run,
		subscribe,
	} = kakfa.consumer({ groupId: id });

	const main = async () => {
		await connect();
		await subscribe({ topic: type, fromBeginning: true });
		await run({
			eachMessage: async (event) => {
				const cloudevent = fromEventType({
					event,
					eventType,
				});
				await handler({ cloudevent });
			},
		});
	};
	main().catch((err) => console.error(err));

	ERROR_TYPES.map((type) => {
		process.on(type, async (err) => {
			try {
				console.log(`process.on ${type}`);
				console.error(err);
				await disconnect();
				process.exit(0);
			} catch (_) {
				process.exit(1);
			}
		});
	});
	SIGNAL_TRAPS.map((type) => {
		process.once(type, async () => {
			try {
				await disconnect();
			} finally {
				process.kill(process.pid, type);
			}
		});
	});
};

module.exports = { subscribe };
