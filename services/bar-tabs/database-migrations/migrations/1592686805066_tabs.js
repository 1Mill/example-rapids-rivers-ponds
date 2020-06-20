/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
	pgm.createTable('tabs', {
		id: 'id',
		table_number: {
			notNull: false,
			type: 'text',
		},
		waiter: {
			notNull: false,
			type: 'text',
		},
	});
};

exports.down = pgm => {
	pgm.dropTable('tabs');
};
