const ioMiddlewareWildcard = require('socketio-wildcard')();
const redisAdapter = require('socket.io-redis');
const {
	KAFKA_EVENTTYPE,
	create,
	isEnriched,
	publish,
	subscribe,
	toEventType,
} = require('@1mill/cloudevents');

const server = require('http').createServer();
const io = require('socket.io')(server);

io.adapter(redisAdapter({
	host: process.env.REDIS_HOST,
	port: process.env.REDIS_PORT,
}));
io.use(ioMiddlewareWildcard);

subscribe({
	brokers: [process.env.RAPIDS_URL],
	eventType: KAFKA_EVENTTYPE,
	handler: async ({ cloudevent }) => {
		// Escape clauses
		// TODO: Abstract not enrichment check into framework
		if (!isEnriched({ cloudevent })) { return; }

		// Fetch buisness data
		// TODO: Abstract data parsing into framework;
		const {
			enrichment,
			id,
			type,
		} = cloudevent;

		// Perform buisness / domain logic
		console.log(id);
		io.to(id).emit(type, JSON.parse(enrichment));
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
					event: toEventType({
						cloudevent,
						eventType: KAFKA_EVENTTYPE,
					}),
					eventType: KAFKA_EVENTTYPE,
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
