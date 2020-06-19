const ioMiddlewareWildcard = require('socketio-wildcard')();
const redisAdapter = require('socket.io-redis');
const {
	KAFKA_EVENTTYPE,
	create,
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
	eventType: KAFKA_EVENTTYPE,
	handler: async ({
		cloudevent,
		data,
		enrichment,
		isEnriched,
	}) => {
		if (!isEnriched) { return; }

		const { id, type } = cloudevent;
		io.to(id).emit(type, enrichment);
	},
	id: 'client-subscriber-service',
	subscribeTo: [process.env.RAPIDS_URL],
	types: [
		'get.company-about-us.2020-06-16',
		'hello-world-2020-06-14',
	],
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
					publishTo: [process.env.RAPIDS_URL],
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
