const getData = ({ cloudevent }) => {
	const value = JSON.parse(cloudevent.message.value);
	const data = JSON.parse(value.data);
	return data;
};

module.exports = { getData };
