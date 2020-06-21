<script>
import { publish, subscribe } from './utilities/cloudevent';

export default {
	data() {
		return {
			menuItems: [],
		};
	},
	created() {
		subscribe({
			handler: ({ payload }) => {
				this.menuItems = payload.map(({ name, priceUSD }) => ({
					name: name.replace('-', ' '),
					price: `$${priceUSD}`,
				}));
			},
			type: 'list-menu-items.2020-21-06',
		});

		publish({ type: 'list-menu-items.2020-21-06' });
		publish({ type: 'open-tab.2020-06-20' });
	},
};
</script>

<template>
	<main>
		<h1>Hello world</h1>
		<h2>Menu</h2>
		<ul>
			<li
			v-for='menuItem in menuItems'
			:key='menuItem.name'
			>
				{{ menuItem.name }}
				({{ menuItem.price }})
			</li>
		</ul>
	</main>
</template>
