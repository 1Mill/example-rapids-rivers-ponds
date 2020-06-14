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
		<input type='text' v-model='payload'/>
		<button @click='produce({ topic: "hello-world-2020-06-14", payloads: [ payload ] })'>
			Create single "hello-world-2020-06-14" topic
		</button>
		<button @click='subscribe'>
			Subscribe to "text-messages" topic
		</button>
	</main>
</template>
