export const getRecords = async ({ consumer, instanceId, proxyUrl }) => {
	const { href } = new URL(
		`consumers/${consumer}/instances/${instanceId}/records`,
		proxyUrl
	);
	const response = await fetch(href, {
		headers: { 'Accept': 'application/vnd.kafka.json.v2+json' },
		method: 'GET',
	});
	const data = response.json();
	return data;
};
