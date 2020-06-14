<script>
import { produce } from './utilities/produce';
import { subscribe } from './utilities/rapids/subscribe';

export default {
	data() {
		return {
			payload: 'my-example-payload',
		};
	},
	methods: {
		produce,
		subscribe,
	},
};
</script>

<template>
	<main>
		<!-- <h1>Hello world!</h1>
		<button @click='produce({
			topics: [
				{ topic: "hello-world" },
				{ topic: "hello-world" },
				{ topic: "hello-world" },
			]
		})'>
			Create "hello-world" topics
		</button> -->
		<input type='text' v-model='payload'/>
		<button @click='produce({ topic: "hello-world", payloads: [ payload ] })'>
			Create single "hello-world" topic
		</button>
		<button @click='subscribe'>
			Subscribe to "text-messages" topic
		</button>
	</main>
</template>
