/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
	pgm.addColumns('tabs', {
		menu_items: {
			type: 'text[]',
		}
	})
};

exports.down = pgm => {
	pgm.dropColumns('tabs', [
		'menu_items'
	]);
};
