<script>
import { produce } from './utilities/produce';
import { subscribe } from './utilities/rapids/subscribe';

export default {
	methods: {
		produce,
		subscribe,
	},
};
</script>

<template>
	<main>
		<h1>Hello world!</h1>
		<button @click='produce()'>
			Create "hello-world" topic
		</button>
		<button @click='subscribe'>
			Subscribe to "text-messages" topic
		</button>
	</main>
</template>
