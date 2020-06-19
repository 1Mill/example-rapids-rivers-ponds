const { KAFKA_EVENTTYPE, subscribe } = require('@1mill/cloudevents');

const ID = 'company-about-us-service';

const DESCRIPTION_HTML = `
	<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cur deinde Metrodori liberos commendas? Quae quo sunt excelsiores, eo dant clariora indicia naturae. Ut pulsi recurrant? Fortemne possumus dicere eundem illum Torquatum? Negare non possum. Quorum sine causa fieri nihil putandum est. Duo Reges: constructio interrete. </p>
	<p>Nescio quo modo praetervolavit oratio. Optime, inquam. Pugnant Stoici cum Peripateticis. </p>
	<p>Sed ille, ut dixi, vitiose. Universa enim illorum ratione cum tota vestra confligendum puto. Consequentia exquirere, quoad sit id, quod volumus, effectum. Qualem igitur hominem natura inchoavit? Sed in rebus apertissimis nimium longi sumus. Aliud igitur esse censet gaudere, aliud non dolere. </p>
	<p>Nihilo beatiorem esse Metellum quam Regulum. Itaque contra est, ac dicitis; Nihil sane. Falli igitur possumus. Duo enim genera quae erant, fecit tria. Paria sunt igitur. Quod quidem iam fit etiam in Academia. Maximus dolor, inquit, brevis est. </p>
	<p>Quae similitudo in genere etiam humano apparet. Tubulum fuisse, qua illum, cuius is condemnatus est rogatione, P. Quod totum contra est. Addidisti ad extremum etiam indoctum fuisse. </p>
	<p>Et quidem, inquit, vehementer errat; Sed mehercule pergrata mihi oratio tua. Sed nimis multa. Tibi hoc incredibile, quod beatissimum. Qui-vere falsone, quaerere mittimus-dicitur oculis se privasse; At eum nihili facit; </p>
`;

subscribe({
	eventType: KAFKA_EVENTTYPE,
	handler: async ({ cloudevent, data, enrichment, isEnriched }) => {
		if (isEnriched) { return; }

		return DESCRIPTION_HTML;
	},
	id: ID,
	publishTo: [ process.env.RAPIDS_URL ],
	subscribeTo: [ process.env.RAPIDS_URL ],
	types: [ 'get.company-about-us.2020-06-16' ],
});
