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
            "demo_q"
          ],
          "bindings": [
            "demo_ex[*.orange.*] -> demo_q",
          ],
          "publications": {
            "demo_publication": {
              "exchange": "demo_ex",
              "routingKey": "*.orange.*"
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