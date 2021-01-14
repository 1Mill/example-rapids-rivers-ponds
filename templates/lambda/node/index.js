const { v4: { createEventStream } } = require('@1mill/cloudevents')

const perform = async ({ cloudevent }) => {
	const { message } = JSON.parse(cloudevent.data || JSON.stringify({ message: 'Hello world!' }))
	console.log(message)
}

const lambda = createEventStream({ protocol: 'lambda' })
exports.handler = lambda.handler(perform)
