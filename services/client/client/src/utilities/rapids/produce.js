export const produce = ({ topic }) => {
	try {
		const { href } = new URL(`/topics/${topic}`, process.env.VUE_APP_RAPIDS_PROXY_URL);
		fetch(href, {
			body: JSON.stringify({
				records: [
					{}
				]
			}),
			headers: {
				'Accept': 'application/vnd.kafka.v2+json',
				'Content-Type': 'application/vnd.kafka.json.v2+json',
			},
			method: 'POST',
		})
		.then(res => res.json())
		.then(data => console.log(data));
	} catch(err) {
		console.error(err);
	}
};
