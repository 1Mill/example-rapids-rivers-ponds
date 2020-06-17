<script>
import { publish, subscribe } from './utilities/cloudevent';

export default {
	data() {
		return {
			payload: 'my-example-payload',
		};
	},
	created() {
		subscribe({
			hanlder: ({ payload }) => { console.log(payload); },
			type: 'hello-world-2020-06-14',
		});
	},
	methods: {
		publish,
	},
};
</script>

<template>
	<main>
		<form @submit.prevent='publish({
			payloads: [ payload ],
			type: "hello-world-2020-06-14",
		})'>
			<input type='text' v-model='payload'/>
			<button type='submit'>
				Submit
			</button>
		</form>
	</main>
</template>
