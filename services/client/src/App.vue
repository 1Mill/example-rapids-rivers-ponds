<script>
import { produce } from './utilities/rapids/produce';

export default {
	methods: {
		produce,
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
