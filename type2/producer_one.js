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
            "demo_q_one"
          ],
          "bindings": [
            "senditdev[*.produceone.*] -> demo_q_one",
          ],
          "publications": {
            "producer_one": {
              "exchange": "senditdev",
              "routingKey": "*.produceone.*"
            }
          },
        }
      }
    });
    broker.on('error', console.error);

    // Publish a message
      const publication = await broker.publish('producer_one', 'เธออยู่ตรงนั้น');
      publication.on('error', console.error);

  } catch(err) {
    console.error(err);
  }
})();