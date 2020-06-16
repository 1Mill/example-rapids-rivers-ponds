const Redis = require("ioredis");
const redisAdapter = require("socket.io-redis");
const { KAFKA_EVENT_TYPE } = require('./lib/constants');
const { isEnriched } = require('./utilities/cloudevents/isEnriched');
const { subscribe } = require('./utilities/subscribe');

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
		io.emit('hello-world')
		// io.sockets.connected[ id ].emit('hello-world', 'hello this is a private msg');
	},
	id: 'client-subscriber-service',
	type: 'hello-world-2020-06-14',
});

server.listen(process.env.PORT, () => {
	console.log(`Listening on ${process.env.HOST}:${process.env.PORT}`);
});
