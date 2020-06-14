const { ERROR_TYPES, SIGNAL_TRAPS } = require('../../lib/constants');
const { Kafka } = require('kafkajs');
const { toCloudevent } = require('../kafkaevent/toCloudevent');

const CLIENT_ID = 'hello-world-service';
const KAFKA = new Kafka({
	brokers: [process.env.RAPIDS_URL],
	clientId: CLIENT_ID,
});

const subscribe = async ({ handler, topic }) => {
	const { connect, disconnect, run, subscribe } = KAFKA.consumer({
		groupId: CLIENT_ID,
	});
	const main = async () => {
		await connect();
		await subscribe({ topic, fromBeginning: true });
		await run({
			eachMessage: async (kafkaevent) => {
				const cloudevent = toCloudevent({ kafkaevent });
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
