# kafka-demo
 A sample code of producer and consumer and an endpoint to produce the message
# Tech stack
* NodeJs
* Express
* Typescript

# Running the code
1. **Clone the Repository:**
   ```bash
   git clone repository_url
2. Install the dependencies
   ```bash
   yarn install
3. Rename **.env.test** to **.env** and add the config for kafka
4. Start the server
   ```bash
   yarn start
5. Publish a message, send post curl
  ```bash
curl -X POST -H "Content-Type: application/json" -d '{"key": "testKey", "value": "testValue"}' http://localhost:6000