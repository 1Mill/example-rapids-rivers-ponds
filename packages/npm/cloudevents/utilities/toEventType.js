const { KAFKA_EVENTTYPE } = require('../lib/constants');

const toEventType = ({ cloudevent, eventType }) => {
	// TODO: Support multiple event types
	if (eventType !== KAFKA_EVENTTYPE) { throw new Error('eventType not supported'); }
	const message = {
		headers: {
			contentType: "application/cloudevents+json;charset=UTF-8"
		},
		value: JSON.stringify(cloudevent),
	};
	const kafkaEvent = {
		messages: [message],
		topic: cloudevent.type,
	};
	return kafkaEvent;
};

module.exports = { toEventType };
