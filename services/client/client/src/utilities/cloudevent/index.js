import io from 'socket.io-client';

const SOCKET = io(process.env.VUE_APP_CLIENT_H_URL);

export const publish = ({ type, payloads }) => {
	SOCKET.emit({ type, payloads });
};

export const subscribe = ({ hanlder, type }) => {
	SOCKET.on(type, (payload) => {
		hanlder({ payload });
	});
};
