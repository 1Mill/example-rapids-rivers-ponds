<script>
export default {
	methods: {
		produce({ topic }) {
			const url = `${process.env.VUE_APP_RAPIDS_PROXY_URL}/topics/${topic}`;
			fetch(url, {
				body: JSON.stringify({
					records: [
						{ value: "testing" }
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
		},
	},
};
</script>

<template>
	<main>
		<h1>Hello world!</h1>
		<button @click='produce({ topic: "hello-world" })'>
			Create "hello-world" topic
		</button>
	</main>
</template>
