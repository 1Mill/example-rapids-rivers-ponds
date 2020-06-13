<script>
export default {
	methods: {
		produce({ topic }) {
			console.log(topic);
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
