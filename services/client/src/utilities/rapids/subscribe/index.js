import { createConsumerInstance } from './createConsumerInstance';
import { deleteConsumerInstance } from './deleteConsumerInstance';

const CONSUMER = 'my-json-consumer';
const RAPIDS_PROXY_URL = process.env.VUE_APP_RAPIDS_PROXY_URL;

export const subscribe = async () => {
	try {
		// 1. Create consumer instance
		const {
			base_uri: consumerUrl,
			instance_id: instanceId,
		} = await createConsumerInstance({
			consumer: CONSUMER,
			proxyUrl: RAPIDS_PROXY_URL,
		});
		console.log(consumerUrl)
		console.log(instanceId);
		// 2. Create subscription through constumer instance
		// 3. Fetch records collected by consumer instance
		// 4. Delete consumer instance
		await deleteConsumerInstance({
			consumer: CONSUMER,
			instance: instanceId,
			proxyUrl: RAPIDS_PROXY_URL,
		});
	} catch (err) {
		console.error(err);
	}
};
