const { v4: { createCloudevent, createEventStream } } = require('@1mill/cloudevents')

const rapids = createEventStream({
	id: process.env.CLOUDEVENT_ID,
	mechanism: process.env.CLOUDEVENT_MECHANISM,
	password: process.env.CLOUDEVENT_PASSWORD,
	protocol: process.env.CLOUDEVENT_PROTOCOL,
	urls: process.env.CLOUDEVENT_URLS.split(','),
	username: process.env.CLOUDEVENT_USERNAME,
})
const perform = async ({ cloudevent }) => {
	const { message } = JSON.parse(cloudevent.data)

	const enrichment = message.split('').reverse().join('')

	await rapids.emit({
		cloudevent: createCloudevent({
			...cloudevent,
			data: JSON.stringify(enrichment),
			datacontenttype: 'application/json',
			id: new Date().toDateString(),
			source: process.env.CLOUDEVENT_ID,
			type: 'hello-world-example.0.e',
		})
	})
}

const lambda = createEventStream({ protocol: 'lambda' })
exports.handler = lambda.handler(perform)
