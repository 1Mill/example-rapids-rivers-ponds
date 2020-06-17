<script>
import { publish, subscribe } from './utilities/cloudevent';

export default {
	data() {
		return {
			payload: 'my-example-payload',
			returnedPayloads: [],
		};
	},
	created() {
		subscribe({
			handler: ({ payload }) => {
				this.returnedPayloads.unshift(payload);
			},
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
		<h2>Returned payloads</h2>
		<ul>
			<li
			v-for='payload in returnedPayloads'
			:key='payload'
			>
				{{ payload }}
			</li>
		</ul>
	</main>
</template>
