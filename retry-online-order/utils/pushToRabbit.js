const Broker = require('rascal').BrokerAsPromised;
let brokers = require('../initamqp');


const pushToRabbit = async (data) => {
    try {
      const broker = await brokers
      broker.on('error', console.error);
  
      // Publish a message
      const publication = await broker.publish('producer_one', data);
      publication.on('error', console.error);

  
    } catch(err) {
      console.error(err);
    }
  }


  module.exports = pushToRabbit