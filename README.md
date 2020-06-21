# Tabs

## Buisness rules

### Must have

* ~~A bill has a tab id~~
* ~~A drink item has a price~~
* ~~A food item has a price~~
* ~~When a party goes to the bar, they may open a party tab.~~

### Should have

* A bill has a cost total
* A member of the party may add drink items to the tab.
* A member of the party may add food items to the tab.
* An employee may close a party's tab.

### Could have

* When a party member adds a drink item to the tab, then the cost of the bill increments by the price of the drink item
* When a party member adds a food item to the tab, then the cost of the bill increments by the price of the food item
* When a tab is closed, then no more food or drink items may be added to the tab.
* When the bill is paid, then the tab becomes closed

### Won't have

* A party may be composd of one or more people.

## References

* How to produce and subscribe to topics through kafka-rest: https://docs.confluent.io/current/kafka-rest/quickstart.html#produce-and-consume-json-messages
* CQRS, focus on verbs not nouns: http://cqrs.nu/tutorial/cs/01-design
