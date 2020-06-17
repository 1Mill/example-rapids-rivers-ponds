const { ERROR_TYPES, KAFKA_EVENTTYPE, SIGNAL_TRAPS } = require('../lib/constants');
const { Kafka } = require('kafkajs');
const { enrich } = require('./enrich');
const { fromEventType } = require('./fromEventType');
const { isEnriched } = require('./isEnriched');
const { publish } = require('./publish');
const { toEventType } = require('./toEventType');

const subscribe = async ({
	brokers,
	eventType,
	handler,
	id,
	type,
}) => {
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
				// Normal flow
				const cloudevent = fromEventType({
					event,
					eventType,
				});
				const enrichment = await handler({
					cloudevent,
					data: JSON.parse(cloudevent.data),
					enrichment: isEnriched({ cloudevent })
						? JSON.parse(cloudevent.enrichment)
						: undefined,
					isEnriched: isEnriched({ cloudevent }),
				});

				// If enrichment value is returned, enrich
				// cloudevent and publish it. Otherwise,
				// do nothing.
				if (enrichment === undefined) { return; }
				const enrichedCloudevent = enrich({
					cloudevent,
					enrichment,
				});
				await publish({
					// TODO: Sub and pub brokers might not
					// TODO: be the same (e.g. river vs rapids)
					brokers,
					event: toEventType({
						cloudevent: enrichedCloudevent,
						eventType,
					}),
					eventType,
					id,
				});
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
