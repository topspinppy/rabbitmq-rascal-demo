const Broker = require('rascal').BrokerAsPromised;



(async () => {

  try {
    const broker = await Broker.create({
      "vhosts": {
        "/": {
          "connection": {
            "url": "amqp://guest:guest@127.0.0.1:5672/"
          },
          "queues": [
            "demo_q_one",
            "demo_q_two"
          ],
          "subscriptions": {
            "demo_sub1": {
              "queue": "demo_q_one",
              "prefetch": 3
            },
            "demo_sub2": {
              "queue": "demo_q_two",
              "prefetch": 3
            }
          }
        }
      }
    });


    // Consume a message
    const subscription = await broker.subscribe('demo_sub1');
    subscription.on('message', (message, content, ackOrNack) => {
      console.log(message.fields.routingKey," === ", content);
      ackOrNack();
    }).on('error', console.error);

    const subscriptiontwo = await broker.subscribe('demo_sub2');
    subscriptiontwo.on('message', (message, content, ackOrNack) => {
      console.log(message.fields.routingKey," === ", content);
      ackOrNack();
    }).on('error', console.error);

    
  } catch (err) {
    console.log(err.message)
  }
})()