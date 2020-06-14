const { Kafka } = require('kafkajs');

const CLIENT_ID = 'client-subscriber-service';
const KAFKA = new Kafka({
	brokers: [process.env.RAPIDS_URL],
	clientId: CLIENT_ID,
});
const ERROR_TYPES = ["unhandledRejection", "uncaughtException"];
const SIGNAL_TRAPS = ["SIGTERM", "SIGINT", "SIGUSR2"];

const subscribe = async({ id, topic }) => {
	const { connect, disconnect, run, subscribe } = KAFKA.consumer({ groupId: CLIENT_ID });
	await connect();
	await subscribe({ topic, fromBeginning: true });
	await run({
		eachMessage: async({ topic, partition, message }) => {
			console.log('Message received');
		},
	});
	run().catch(err => console.error(err));

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
