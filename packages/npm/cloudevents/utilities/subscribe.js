const { ERROR_TYPES, KAFKA_EVENTTYPE, SIGNAL_TRAPS } = require('../lib/constants');
const { Kafka } = require('kafkajs');
const { enrich } = require('./enrich');
const { fromEventType } = require('./fromEventType');
const { isEnriched } = require('./isEnriched');
const { publish } = require('./publish');
const { toEventType } = require('./toEventType');

const subscribe = async ({
	handler,
	id,
	publishEventType,
	publishTo,
	subscribeEventType,
	subscribeTo,
	types,
}) => {
	// TODO: Support other event types (e.g. rabbitmq)
	if (subscribeEventType !== KAFKA_EVENTTYPE) {
		throw Error("Invalid event type");
	}

	const kakfa = new Kafka({
		brokers: subscribeTo,
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
		// ? Can we parallelize ?
		await types.forEach(async (type) => {
			await subscribe({ topic: type, fromBeginning: true });
		});
		await run({
			eachMessage: async (event) => {
				// Normal flow
				const cloudevent = fromEventType({
					event,
					eventType: subscribeEventType,
				});
				// ? Should just pass in {...cloudevent} with
				// ? Other properties ?
				const enrichment = await handler({
					...cloudevent,
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
					publishTo,
					event: toEventType({
						cloudevent: enrichedCloudevent,
						eventType: publishEventType,
					}),
					eventType: publishEventType,
					id,
				});
			},
		});
	};
	main().catch((err) => console.error(err));

	ERROR_TYPES.map((errorType) => {
		process.on(errorType, async (err) => {
			try {
				console.log(`process.on ${errorType}`);
				console.error(err);
				await disconnect();
				process.exit(0);
			} catch (_) {
				process.exit(1);
			}
		});
	});
	SIGNAL_TRAPS.map((signalTrap) => {
		process.once(signalTrap, async () => {
			try {
				await disconnect();
			} finally {
				process.kill(process.pid, signalTrap);
			}
		});
	});
};

module.exports = { subscribe };
