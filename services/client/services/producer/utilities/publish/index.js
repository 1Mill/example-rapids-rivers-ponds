const { Kafka } = require("kafkajs");

const CLIENT_ID = "client-producer-service";
const KAFKA = new Kafka({
	brokers: [process.env.RAPIDS_URL],
	clientId: CLIENT_ID,
});

const publish = async ({ messages, topic }) => {
	const { connect, disconnect } = KAFKA.producer();
	const { send } = await connect();
	await send({ messages, topic });
	disconnect();
};

module.exports = { publish };
