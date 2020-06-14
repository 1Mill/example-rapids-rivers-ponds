const toCloudevent = ({ kafkaevent }) => {
	const cloudevent = JSON.parse(kafkaevent.message.value);
	return cloudevent;
};

module.exports = { toCloudevent };
