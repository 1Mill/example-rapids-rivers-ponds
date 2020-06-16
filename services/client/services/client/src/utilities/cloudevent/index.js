import io from 'socket.io-client';

const SOCKET = io(process.env.VUE_APP_CLIENT_H_URL);

export const publish = ({ type, payloads }) => {
	SOCKET.emit({ type, payloads });
};

export const subscribe = () => {
	SOCKET.on('hello-world', () => {
		console.log('testing');
	});
};
