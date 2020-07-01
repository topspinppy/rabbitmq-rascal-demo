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
            "demo_ex"
          ],
          "queues": [
            "demo.sendit.speed-d.dev",
            "demo.sendit.columbus.dev"
          ],
          "bindings": {
            "demo_exs": {
              "source": "demo_ex",
              "destination": "demo.sendit.speed-d.dev",
              "bindingKeys": "*.*.speed-d.*"
            },
            "demo_ex1": {
              "source": "demo_ex",
              "destination": "demo.sendit.columbus.dev",
              "bindingKeys": "*.*.columbus.#"
            }
          },
          "publications": {
            "demo_publication": {
              "exchange": "demo_ex",
              "routingKey": process.env.ROUTING_KEY
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