const { KAFKA_EVENTTYPE } = require('./lib/constants');
const { create } = require('./utilities/create');
const { enrich } = require('./utilities/enrich');
const { isEnriched } = require('./utilities/isEnriched');
const { toEventType } = require('./utilities/toEventType');

module.exports = Object.freeze({
	KAFKA_EVENTTYPE,
	create,
	enrich,
	isEnriched,
	toEventType,
});
