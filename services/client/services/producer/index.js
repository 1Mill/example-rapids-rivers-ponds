const ioMiddlewareWildcard = require('socketio-wildcard')();
const ioRedisAdapter = require('socket.io-redis');
const { create } = require('./utilities/cloudevents/create');
const { publish } = require('./utilities/publish');

const server = require('http').createServer();

const io = require('socket.io')(server);
io.adapter(
	ioRedisAdapter({
		host: process.env.REDIS_HOST,
		port: process.env.REDIS_PORT,
	})
);
io.use(ioMiddlewareWildcard);

io.on('connect', (socket) => {
	socket.on('*', (packet) => {
		try {
			const [ { type, payloads } ] = packet.data;
			payloads.forEach(payload => {
				const cloudevent = create({
					data: payload,
					id: socket.id,
					source: packet.nsp,
					type,
				});
				// const kafkaEvent = toKafkaEvent({ cloudevent });
				// publish({ kafkaEvent });
				// publish({
				// 	id: socket.id,
				// 	payloads,
				// 	type,
				// });
			});
		} catch (err) {
			console.error(err);
		}
	});
});

server.listen(process.env.PORT, () => {
	console.log(`Listening on ${process.env.HOST}:${process.env.PORT}`);
});
