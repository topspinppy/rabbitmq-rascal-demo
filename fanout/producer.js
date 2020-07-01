const Broker = require('rascal').BrokerAsPromised;


(async () => {
  try {
    const broker = await Broker.create({
      "vhosts": {
        "/": {
          "connection": {
            "url": "amqp://guest:guest@127.0.0.1:5672/"
          },
          "exchanges": [
            {
              "name": "senditdevfanout",
              "type": "fanout",
              "options": {
                "durable": "false"
              }
            }
          ],
          "queues": [
            "demo_q",
            "demo_q_two"
          ],
          "bindings": {
            "demo_ex": {
              "source": "senditdevfanout",
              "destination": "demo_q",
            },
            "demo_ex1": {
              "source": "senditdevfanout",
              "destination": "demo_q_two"
            }
          },
          "publications": {
            "demo_publication": {
              "exchange": "senditdevfanout",
            }
          },
        }
      }
    });
    broker.on('error', console.error);

    // Publish a message
      const publication = await broker.publish('demo_publication', 'เธออยู่ตรงนั้น');
      publication.on('error', console.error);

  } catch(err) {
    console.error(err);
  }
})();