const ioMiddlewareWildcard = require('socketio-wildcard')();
const redisAdapter = require('socket.io-redis');
const {
	KAFKA_EVENTTYPE,
	create,
	publish,
	subscribe,
	toEventType,
} = require('@1mill/cloudevents');

const ID = 'services.client-h';

const server = require('http').createServer();
const io = require('socket.io')(server);

io.adapter(redisAdapter({
	host: process.env.REDIS_HOST,
	port: process.env.REDIS_PORT,
}));
io.use(ioMiddlewareWildcard);

subscribe({
	handler: async ({ id, isEnriched, type }) => {
		if (!isEnriched) { return; }
		io.to(id).emit(type, enrichment);
	},
	id: ID,
	subscribeEventType: KAFKA_EVENTTYPE,
	subscribeTo: [process.env.RAPIDS_URL],
	types: [],
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
					id: ID,
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
