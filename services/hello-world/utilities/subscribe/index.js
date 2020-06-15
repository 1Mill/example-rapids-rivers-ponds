const { ERROR_TYPES, SIGNAL_TRAPS } = require('../../lib/constants');
const { Kafka } = require('kafkajs');
const { getCloudevent } = require('../kafkaEvent/getCloudevent');

const subscribe = async ({ brokers, eventType, handler, id, type }) => {
	// TODO: Support other event types (e.g. rabbitmq)
	if (eventType !== 'kafka') { throw Error('Invalid event type'); }

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
			eachMessage: async (kafkaEvent) => {
				const cloudevent = getCloudevent({ kafkaEvent });
				handler({ cloudevent });
			},
		});
	};
	main().catch((err) => console.error(err));

	ERROR_TYPES.map((type) => {
		process.on(type, async (e) => {
			try {
				console.log(`process.on ${type}`);
				console.error(e);
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
