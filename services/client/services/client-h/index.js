const Redis = require("ioredis");
const redisAdapter = require("socket.io-redis");
const { KAFKA_EVENT_TYPE } = require('./lib/constants');
const { create } = require('./utilities/cloudevents/create');
const { isEnriched } = require('./utilities/cloudevents/isEnriched');
const { publish } = require('./utilities/publish');
const { subscribe } = require('./utilities/subscribe');
const { toKafkaEvent } = require('./utilities/cloudevents/toKafkaEvent');

const server = require('http').createServer();
const io = require("socket.io")(server);

const redisClusters = [{
	host: process.env.REDIS_HOST,
	port: process.env.REDIS_PORT,
}];
io.adapter(redisAdapter({
	pubClient: new Redis.Cluster(redisClusters),
	subClient: new Redis.Cluster(redisClusters),
}));

subscribe({
	brokers: [process.env.RAPIDS_URL],
	eventType: KAFKA_EVENT_TYPE,
	handler: async ({ cloudevent }) => {
		// Escape clauses
		// TODO: Abstract not enrichment check into framework
		if (!isEnriched({ cloudevent })) { return; }

		// Fetch buisness data
		// TODO: Abstract data parsing into framework;
		const data = JSON.parse(cloudevent.data);
		const enrichment = JSON.parse(cloudevent.enrichment);
		const { id } = cloudevent;

		// Perform buisness / domain logic
		console.log(id);
	},
	id: 'client-subscriber-service',
	type: 'hello-world-2020-06-14',
});


io.on('connect', (socket) => {
	socket.on('*', (packet) => {
		try {
			const [{ type, payloads }] = packet.data;
			payloads.forEach(payload => {
				const cloudevent = create({
					data: payload,
					id: socket.id,
					source: packet.nsp,
					type,
				});
				publish({
					brokers: [process.env.RAPIDS_URL],
					event: toKafkaEvent({ cloudevent }),
					eventType: KAFKA_EVENT_TYPE,
					id: 'client-producer-service',
				});
			});
		} catch (err) {
			console.error(err);
		}
	});
});


server.listen(process.env.PORT, () => {
	console.log(`Listening on ${process.env.HOST}:${process.env.PORT}`);
});
