export const subscribeToTopic = async ({ consumer, instanceId, proxyUrl, topic }) => {
	const { href } = new URL(
		`consumers/${consumer}/instances/${instanceId}/subscription`,
		proxyUrl
	);
	await fetch(href, {
		body: JSON.stringify({
			topics: [topic]
		}),
		headers: { 'Content-Type': 'application/vnd.kafka.v2+json' },
		method: 'POST',
	});
};
