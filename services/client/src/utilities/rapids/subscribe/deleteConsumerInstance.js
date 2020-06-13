export const deleteConsumerInstance = async ({ consumer, instance, proxyUrl }) => {
	try {
		const { href } = new URL(
			`consumers/${consumer}/instances/${instance}`,
			proxyUrl
		);
		await fetch(href, {
			headers: { 'Content-Type': 'application/vnd.kafka.v2+json' },
			method: 'DELETE',
		});
	} catch (err) {
		console.error(err);
	}
};
