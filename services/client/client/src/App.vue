<script>
import { publish } from './utilities/cloudevent';

export default {
	created() {
		publish({ type: 'open-tab.2020-06-20' });
	},
};
</script>

<template>
	<main>
		<h1>Hello world</h1>
	</main>
</template>
