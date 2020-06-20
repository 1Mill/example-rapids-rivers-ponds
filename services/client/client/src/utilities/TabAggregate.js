export class TabAggregate {
	constructor({ tableNumber, waiter }) {
		this.id = Math.floor(Math.random() * 1000000);
		this.tableNumber = tableNumber;
		this.waiter = waiter;
	}
}
