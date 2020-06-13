export const createConsumerInstance = async ({ consumer, proxyUrl }) => {
	const { href } = new URL(`consumers/${consumer}`, proxyUrl);
	const response = await fetch(href, {
		body: JSON.stringify({
			'auto.offset.reset': 'earliest',
			format: 'json',
			name: 'my-consumer-instance'
		}),
		headers: { 'Content-Type': 'application/vnd.kafka.v2+json' },
		method: 'POST'
	});
	const data = await response.json();
	return data;
};
