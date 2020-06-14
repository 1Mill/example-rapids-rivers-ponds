const enrich = ({ cloudevent }) => {
	console.log('Enriching');
	return cloudevent;
};

module.exports = { enrich };
