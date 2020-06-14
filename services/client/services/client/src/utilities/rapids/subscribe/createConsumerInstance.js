export const createConsumerInstance = async ({ consumer, instanceId, proxyUrl }) => {
	const { href } = new URL(`consumers/${consumer}`, proxyUrl);
	const response = await fetch(href, {
		body: JSON.stringify({
			'auto.offset.reset': 'earliest',
			format: 'json',
			name: instanceId,
		}),
		headers: { 'Content-Type': 'application/vnd.kafka.v2+json' },
		method: 'POST'
	});
	const data = await response.json();
	return data;
};
