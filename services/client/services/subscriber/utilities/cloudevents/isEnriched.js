const isEnriched = ({ cloudevent }) => {
	return cloudevent.hasOwnProperty('enrichment');
};

module.exports = { isEnriched };
