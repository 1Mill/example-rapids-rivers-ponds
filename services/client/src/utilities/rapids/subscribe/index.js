import { createConsumerInstance } from './createConsumerInstance';

export const subscribe = async () => {
	try {
		console.log("SUBSCRIBINGsdfsdf!");

		// 1. Create consumer instance
		const data = await createConsumerInstance();
		console.log("data", data);
		// 2. Create subscription through constumer instance
		// 3. Fetch records collected by consumer instance
		// 4. Delete consumer instance
	} catch (err) {
		console.error(err);
	}
};
