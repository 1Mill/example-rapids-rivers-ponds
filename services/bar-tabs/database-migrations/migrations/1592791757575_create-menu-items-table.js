/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
	pgm.createTable('menu_items', {
		id: 'id',
		menu_item_id: {
			notNull: true,
			type: 'string'
		},
		tab_id: {
			notNull: true,
			onDelete: 'cascade',
			references: '"tabs"',
			type: 'integer',
		},
	});
	pgm.createIndex('menu_items', 'tab_id');
};

exports.down = pgm => {
	pgm.dropIndex('menu_items', 'tab_id');
	pgm.dropTable('menu_items');
};
