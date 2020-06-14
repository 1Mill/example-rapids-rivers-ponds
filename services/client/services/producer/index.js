const ioMiddlewareWildcard = require('socketio-wildcard')();
const ioRedisAdapter = require('socket.io-redis');
// const { publish } = require('./utilities/publish');

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
			const [ topic ] = packet.data;
			console.log('Topic: ', topic);
		} catch (err) {
			console.error(err);
		}
	});
});

server.listen(process.env.PORT, () => {
	console.log(`Listening on ${process.env.HOST}:${process.env.PORT}`);
});
