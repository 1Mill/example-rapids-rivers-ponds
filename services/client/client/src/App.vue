<script>
import { publish, subscribe } from './utilities/cloudevent';

export default {
	data() {
		return {
			aboutTheCompanyHtml: '',
			payload: 'my-example-payload',
			returnedPayloads: [],
		};
	},
	created() {
		// Get mesasge back from hello world service
		subscribe({
			handler: ({ payload }) => {
				this.returnedPayloads.unshift(payload);
			},
			type: 'hello-world-2020-06-14',
		});
		publish({
			payloads: [ 'detaerc-morf-si-siht' ],
			type: 'hello-world-2020-06-14',
		});

		// Get company history
		publish({ type: 'get.company-about-us.2020-06-16' }),
		subscribe({
			handler: ({ payload }) => {
				this.aboutTheCompanyHtml = payload;
			},
			type: 'get.company-about-us.2020-06-16'
		})
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
			v-for='(payload, index) in returnedPayloads'
			:key='`${payload}-${index}`'
			>
				{{ payload }}
			</li>
		</ul>

		<h1>History of the company</h1>
		<article v-html='aboutTheCompanyHtml'></article>
	</main>
</template>
