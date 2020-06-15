const enrich = ({
	cloudevent,
	enrichment,
	enrichmentcontenttype = 'application/json',
}) => {
	return {
		...cloudevent,
		enrichment: JSON.stringify(enrichment),
		enrichmentcontenttype,
	};
};

module.exports = { enrich };
