const ENRICHMENT_PROPERTY = 'enrichment';

const isEnriched = ({ cloudevent }) => {
	return cloudevent.hasOwnProperty(ENRICHMENT_PROPERTY);
};

module.exports = { isEnriched };
