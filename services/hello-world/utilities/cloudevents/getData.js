const getData = ({ cloudevent }) => {
	return JSON.parse(cloudevent.data);
};

module.exports = { getData };
