const getCloudevent = ({ kafkaEvent }) => {
	const cloudevent = JSON.parse(kafkaEvent.message.value);
	return cloudevent;
};

module.exports = { getCloudevent };
