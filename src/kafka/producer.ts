import { Kafka, Producer, ProducerRecord } from 'kafkajs';
import { env } from '../env';


const kafkaBrokers = env.kafka.host;
const topic = env.kafka.topic;

const kafka = new Kafka({
  brokers: [kafkaBrokers],
  ssl: true,
  sasl: {
    mechanism: 'SCRAM-SHA-512',
    username: env.kafka.username,
    password: env.kafka.password,
  },
} as any);

const producer = kafka.producer();

const produceMessage = async (message: { key?: string, value: string }) => {
  await producer.connect();

  const producerRecord: ProducerRecord = {
    topic,
    messages: [message],
  };

  await producer.send(producerRecord);

  await producer.disconnect();
};

export default produceMessage;