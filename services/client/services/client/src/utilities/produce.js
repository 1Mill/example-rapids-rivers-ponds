import io from 'socket.io-client';

const SOCKET = io(process.env.VUE_APP_PRODUCER_URL);

export const produce = ({ type, payloads }) => {
	SOCKET.emit({ type, payloads });
};
