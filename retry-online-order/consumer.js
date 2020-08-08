const Broker = require('rascal').BrokerAsPromised;



(async () => {
  try {
    const broker = await Broker.create({
      "vhosts": {
        "/": {
          "connection": {
            "url": "amqp://guest:guest@127.0.0.1:5672/"
          },
          "queues": {
            "oms-order-queue": {
              "options": {
                "durable": "1000",
              }
            },
            "oms-order-queue-retry": {
              "options": {
                "durable": "1000",
                "arguments": {
                  "x-dead-letter-exchange": "oms-order-queue",
                  "x-dead-letter-routing-key":"oms-online",
                  "x-message-ttl": 10000
                }
              }
            }
          },
          "subscriptions": {
            "consumer": {
              "queue": "oms-order-queue",
              "prefetch": 3
            },
          }
        }
      }
    });


    // Consume a message
    const subscription = await broker.subscribe('consumer');
    subscription.on('message', (message, content, ackOrNack) => {
      console.log(message.fields.routingKey," === ", content);
      ackOrNack();
    }).on('error', console.error);

    
  } catch (err) {
    console.log(err.message)
  }
})()