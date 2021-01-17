const { v4: { createCloudevent, createEventStream } } = require('@1mill/cloudevents')

const river = createEventStream({
	id: process.env.CLOUDEVENT_ID,
	mechanism: process.env.CLOUDEVENT_MECHANISM,
	password: process.env.CLOUDEVENT_PASSWORD,
	protocol: process.env.CLOUDEVENT_PROTOCOL,
	urls: process.env.CLOUDEVENT_URLS.split(','),
	username: process.env.CLOUDEVENT_USERNAME,
})
const perform = async ({ cloudevent }) => {
	await river.emit({ cloudevent })
}

const lambda = createEventStream({ protocol: 'lambda' })
exports.handler = lambda.handler(perform)
