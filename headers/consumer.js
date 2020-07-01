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
            "demo_q_headers_two"
          ],
          "subscriptions": {
            "demo_subscription": {
              "queue": "demo_q_headers_two",
              "prefetch": 3
            }
          }
        }
      }
    });
    broker.on('error', console.error);

  // Consume a message
  const subscription = await broker.subscribe('demo_subscription');
  subscription.on('message', (message, content, ackOrNack) => {
    console.log(message.fields.routingKey," === ", content);
    ackOrNack();
  }).on('error', console.error);

  } catch(err) {
    console.error(err);
  }
})();