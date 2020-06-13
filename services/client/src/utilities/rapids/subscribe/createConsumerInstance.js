export const createConsumerInstance = async () => {
	const { href } = new URL(
		"consumers/my_json_consumer",
		process.env.VUE_APP_RAPIDS_PROXY_URL
	);
	const response = await fetch(href, {
		body: JSON.stringify({
			"auto.offset.reset": "earliest",
			format: "json",
			name: "my-consumer-instance"
		}),
		headers: { "Content-Type": "application/vnd.kafka.v2+json" },
		method: "POST"
	});
	const data = await response.json();
	return data;
};
