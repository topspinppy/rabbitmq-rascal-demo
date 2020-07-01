const Broker = require('rascal').BrokerAsPromised;


(async () => {
  try {
    const broker = await Broker.create({
      "vhosts": {
        "/": {
          "connection": {
            "url": "amqp://guest:guest@127.0.0.1:5672/"
          },
          "exchanges": {
            "senditdevheaders": {
              "type": "headers"
            }
          },
          "queues": [
            "demo_q_headers",
            "demo_q_headers_two"
          ],
          "bindings": {
            "demo_ex": {
              "source": "senditdevheaders",
              "destination": "demo_q_headers",
              "options": {
                "x-match": "any",
                "type": "pdf"
              }
            },
            "demo_ex1": {
              "source": "senditdevheaders",
              "destination": "demo_q_headers_two",
              "options": {
                "x-match": "all",
                "type": "docx"
              }
            }
          },
          "publications": {
            "demo_publication": {
              "exchange": "senditdevheaders",
            }
          },
        }
      }
    });
    broker.on('error', console.error);

    var data = {
      "x-match": "any",
      "type": "pdf"
    };    
      const publication = await broker.publish('demo_publication', data);
      publication.on("success", (messageId) => {
        console.log("Message id was: ", messageId)
      }).on("error", (err, messageId) => {
         console.error("Error was: ", err.message)
      }).on("paused", (messageId) => {
         console.warn("Publication was paused. Aborting message: ", messageId)
         publication.abort();
      })
  } catch(err) {
    console.log(err);
  }
})();