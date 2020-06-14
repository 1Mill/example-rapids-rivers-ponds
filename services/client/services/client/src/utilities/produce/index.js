import io from 'socket.io-client';

const SOCKET = io(process.env.VUE_APP_PRODUCER_URL);

export const produce = () => {
	SOCKET.emit({ topic: "hello-world", payloads: ['testing'] });
};
