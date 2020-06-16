const { KAFKA_EVENTTYPE } = require('../lib/constants');

const fromEventType = ({ event, eventType }) => {
	if (eventType !== KAFKA_EVENTTYPE) { throw new Error('eventType not supported'); }

	const cloudevent = JSON.parse(event.message.value);
	return cloudevent;
};

module.exports = { fromEventType };
