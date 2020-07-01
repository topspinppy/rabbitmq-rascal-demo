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
            "senditdev"
          ],
          "queues": [
            "demo_q_two"
          ],
          "bindings": [
            "senditdev[*.producetwo.*] -> demo_q_two",
          ],
          "publications": {
            "producer_two": {
              "exchange": "senditdev",
              "routingKey": "*.producetwo.*"
            }
          },
        }
      }
    });
    broker.on('error', console.error);

    // Publish a message
      const publication = await broker.publish('producer_two', 'เธอได้ยินฉันหรือเปล่า');
      publication.on('error', console.error);

  } catch(err) {
    console.error(err);
  }
})();