<script>
import { publish, subscribe } from './utilities/cloudevent';

export default {
	data() {
		return {
			menuItems: [],
			tabId: null,
		};
	},
	created() {
		subscribe({
			handler: ({ payload }) => {
				this.menuItems = payload.map(({ name, priceUSD }) => ({
					displayName: name.replace('-', ' '),
					name,
					price: `$${priceUSD}`,
				}));
			},
			type: 'list-menu-items.2020-21-06',
		});
		subscribe({
			handler: ({ payload }) => {
				console.log('testing');
				this.tabId = payload;
			},
			type: 'open-tab.2020-06-21',
		});

		publish({ type: 'list-menu-items.2020-21-06' });
		publish({ type: 'open-tab.2020-06-21' });
	},
};
</script>

<template>
	<main>
		<h1>Tab: #{{ tabId }}</h1>
		<h2>Menu</h2>
		<ul>
			<li
			v-for='menuItem in menuItems'
			:key='menuItem.name'
			>
				{{ menuItem.displayName }}
				({{ menuItem.price }})
				<button @click='addMenuItems({ menuItem })'>
					Add to tab
				</button>
			</li>
		</ul>
	</main>
</template>
