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
            "demo_ex[*.fruit.*] -> demo_q",
          ],
          "publications": {
            "demo_publication": {
              "exchange": "demo_ex",
              "routingKey": "*.fruit.*"
            }
          }
        }
      }
    });
    broker.on('error', console.error);

    // Publish a message
    const publication = await broker.publish('demo_publication', 'เธอได้ยินชั้นหรือเปล่า');
    publication.on('error', console.error);

  } catch(err) {
    console.error(err);
  }
})();