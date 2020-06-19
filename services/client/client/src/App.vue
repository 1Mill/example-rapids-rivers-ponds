<script>
import { publish, subscribe } from './utilities/cloudevent';

export default {
	data() {
		return {
			aboutTheCompanyHtml: '',
			employees: [],
			payload: 'my-example-payload',
			returnedPayloads: [],
		};
	},
	created() {
		// Get message back from hello world service
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
		publish({ type: 'get.company-about-us.2020-06-16' })
		subscribe({
			handler: ({ payload }) => {
				this.aboutTheCompanyHtml = payload;
			},
			type: 'get.company-about-us.2020-06-16'
		})

		// Get employee data
		publish({ type: 'company-employes.index.2020-06-18' })
		subscribe({
			handler: ({ payload }) => {
				console.log(payload)
			},
			type: 'company-employes.index.2020-06-18',
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

		<h2>Company employees</h2>
		<div
		v-for='employee in employees'
		:key='employee.id'
		>
			<div>
				<strong>{{ employee.name }}</strong>
				({{ employee.id }})
			</div>
			<div>
				<strong>{{ employee.title }}</strong>
			</div>
			<div>
				{{ employee.description }}
			</div>
		</div>
	</main>
</template>
