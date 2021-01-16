const { v4: { createCloudevent, createEventStream } } = require('@1mill/cloudevents')

const rapids = createEventStream({
	id: process.env.CLOUDEVENT_ID,
	mechanism: process.env.CLOUDEVENT_MECHANISM,
	password: process.env.CLOUDEVENT_PASSWORD,
	urls: process.env.CLOUDEVENT_URLS,
	username: process.env.CLOUDEVENT_USERNAME,

})
const perform = async ({ cloudevent }) => {
	const { message } = JSON.parse(cloudevent.data || JSON.stringify({ message: 'Hello world!' }))

	const enrichment = message.split('').reverse().join('')

	rapids.emit({
		cloudevent: createCloudevent({
			...cloudevent,
			data: JSON.stringify(enrichment),
			datacontenttype: 'application/json',
			source: process.env.CLOUDEVENT_ID,
			type: 'todo.0.e',
		})
	})
}

const lambda = createEventStream({ protocol: 'lambda' })
exports.handler = lambda.handler(perform)
