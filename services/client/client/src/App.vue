<script>
import { publish, subscribe } from './utilities/cloudevent';

export default {
	data() {
		return {
			payload: 'my-example-payload',
		};
	},
	created() {
		subscribe();
	},
	methods: {
		publish,
	},
};
</script>

<template>
	<main>
		<input type='text' v-model='payload'/>
		<button @click='publish({ type: "hello-world-2020-06-14", payloads: [ payload ] })'>
			Create single "hello-world-2020-06-14" type (e.g. kafka-topic)
		</button>
		<!-- <button @click='subscribe'>
			Subscribe to "text-messages" topic
		</button> -->
	</main>
</template>
