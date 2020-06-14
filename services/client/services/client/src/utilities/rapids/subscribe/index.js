import { createConsumerInstance } from './createConsumerInstance';
import { deleteConsumerInstance } from './deleteConsumerInstance';
import { getRecords } from './getRecords';
import { subscribeToTopic } from './subscribeToTopic';

const CONSUMER = 'my-json-consumer';
const INSTANCE_ID = 'my-instance-id';
const RAPIDS_PROXY_URL = process.env.VUE_APP_RAPIDS_PROXY_URL;

export const subscribe = async () => {
	try {
		// 1. Create consumer instance
		await createConsumerInstance({
			consumer: CONSUMER,
			instanceId: INSTANCE_ID,
			proxyUrl: RAPIDS_PROXY_URL,
		});

		// 2. Create subscription through constumer instance
		await subscribeToTopic({
			consumer: CONSUMER,
			instanceId: INSTANCE_ID,
			proxyUrl: RAPIDS_PROXY_URL,
			topic: 'hello-world-2020-06-14',
		});

		// 3. Fetch records collected by consumer instance
		// TODO: figure out why data only shows on on second requests
		const data = await getRecords({
			consumer: CONSUMER,
			instanceId: INSTANCE_ID,
			proxyUrl: RAPIDS_PROXY_URL,
		});
		console.log(data);
		const data2 = await getRecords({
			consumer: CONSUMER,
			instanceId: INSTANCE_ID,
			proxyUrl: RAPIDS_PROXY_URL
		});
		console.log(data2);

		// 4. Delete consumer instance
		await deleteConsumerInstance({
			consumer: CONSUMER,
			instance: INSTANCE_ID,
			proxyUrl: RAPIDS_PROXY_URL
		});
	} catch (err) {
		console.error(err);
	}
};
