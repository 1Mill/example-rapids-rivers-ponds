const toKafkaEvent = ({ cloudevent }) => {
	const message = {
		headers: { contentType: 'application/cloudevents+json;charset=UTF-8' },
		value: JSON.stringify(cloudevent),
	}
	const kafkaEvent = {
		messages: [ message ],
		topic: cloudevent.type,
	};
	return kafkaEvent;
};

module.exports = { toKafkaEvent };
