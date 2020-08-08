const orderModel = require('../model/order');

const Broker = require('rascal').BrokerAsPromised;
let brokers = require('../initamqp');



module.exports = async (io) => {
  try {
    const broker = await brokers


    // Consume a message
    const subscription = await broker.subscribe('consumer');
    subscription.on('message', async (message, content, ackOrNack) => {
      
      if(Math.floor(Math.random() * 5) === 3) {
        console.log(message.fields.routingKey," === ", content);
      } else {
        ackOrNack(new Error("Something went wrong"), { strategy: 'forward', publication: 'producer_retry' })
      }
    })

    
  } catch (err) {
    console.log(err.message)
  }
}