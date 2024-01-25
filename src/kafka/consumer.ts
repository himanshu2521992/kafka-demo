import { Kafka, KafkaMessage } from 'kafkajs';
import { env } from '../env';

const kafkaBrokers = env.kafka.host;
const topic = env.kafka.topic;
const groupId = env.kafka.groupId;
const kafka = new Kafka({
  brokers: [kafkaBrokers],
  ssl: true,
  sasl: {
    mechanism: 'SCRAM-SHA-512',
    username: env.kafka.username,
    password: env.kafka.password,
  },
} as any);
const consumer = kafka.consumer({ groupId });

const consumeMessages = async () => {
  await consumer.connect();
  await consumer.subscribe({ topic });

  await consumer.run({
    autoCommit: false,
    eachMessage: async ({ topic, partition, message }) => {
      onMessage(message, topic, partition);
    },
  });
};
const onMessage = (message: KafkaMessage, topic: string, partition: number) => {
  console.log({
    partition,
    offset: message.offset,
    value: message.value!.toString(),
  });
  // commit the message, if server restarts it will take messages after commited offset
  const offset = (+message.offset + 1).toString();
  consumer.commitOffsets([{ topic, partition, offset }]);
}

export { consumer, consumeMessages };
