const { isEnriched } = require('./isEnriched');

const getEnrichedData = ({ cloudevent }) => {
	if (!isEnriched({ cloudevent })) { return; }
	return { "hello": "crazy" };
};

module.exports = { getEnrichedData };
