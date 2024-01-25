import dotenv from 'dotenv';
// Load environment variables from .env file
dotenv.config();

export const env = {
  app: {
    port: process.env.PORT,
  },
  kafka: {
    host: process.env.KAFKA_BROKERS || '',
    username: process.env.KAFKA_USER || '',
    password: process.env.KAFKA_PASSWORD || '',
    topic: process.env.TOPIC_NAME || 'your-topic-name',
    groupId: process.env.GROUP_ID || '',
  }
}