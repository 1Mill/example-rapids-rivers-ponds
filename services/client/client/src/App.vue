<script>
import { TabAggregate } from './utilities/TabAggregate';
// import { publish, subscribe } from './utilities/cloudevent';

export default {
	created() {
		const tab = new TabAggregate({
			tableNumber: '12',
			waiter: 'William Tell',
		});
		console.log(tab.id);
	},
};
</script>

<template>
	<main>
		<h1>Hello world</h1>
	</main>
</template>
