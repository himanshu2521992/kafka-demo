// src/app.ts
import express from 'express';
import { env } from './env';
import { consumeMessages } from './kafka/consumer';
import bodyParser from 'body-parser';
import produceMessage from './kafka/producer';

const app = express();
const port = env.app.port || 3000;

// Use body-parser middleware to parse JSON and url-encoded request bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Hello, Welcome to kafka demo!');
});

app.post('/', async (req, res) => {
  const data = req.body;
  if (!data) res.status(400).send('Please provide the message');
  await produceMessage(data);
  res.send('Message published');
});

app.listen(port, () => {
  console.log(`Application is up and running on http://localhost:${port}`);
});

consumeMessages();