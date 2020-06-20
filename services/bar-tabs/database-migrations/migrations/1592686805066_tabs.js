/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
	pgm.createTable('tabs', {
		id: 'id',
		createdAt: {
			default: pgm.func('current_timestamp'),
			notNull: true,
			type: 'timestamp',
		},
		tableName: {
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
