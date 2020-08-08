const Broker = require('rascal').BrokerAsPromised;

module.exports = Broker.create({
    "vhosts": {
      "/": {
        "connection": {
          "url": "amqp://guest:guest@127.0.0.1:5672/"
        },
        "exchanges": [
          "oms-exchanges",
          "oms-exchanges-retry"
        ],
        "queues": {
          "oms-order-queue": {
            "options" : {
              "durable": true,
            }
          },
          "oms-order-queue-retry": {
            "options" : {
              "durable": true,
              "deadLetterExchange": "oms-order-queue",
              "deadLetterRoutingKey": "oms-exchanges",
              "messageTtl": 30000
            }
          }
        },
        "bindings": [
          "oms-exchanges[oms-online] -> oms-order-queue",
          "oms-exchanges-retry[oms-online-retry] -> oms-order-queue-retry"
        ],
        "publications": {
          "producer_one": {
            "exchange": "oms-exchanges",
            "routingKey": "oms-online",
          },
          "producer_retry": {
            "exchange": "oms-exchanges-retry",
            "routingKey": "oms-online-retry"
          }
        },
        "subscriptions": {
          "consumer": {
            "queue": "oms-order-queue",
          },
        },
      }
    }
  });
