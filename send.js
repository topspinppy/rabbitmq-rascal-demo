var amqp = require('amqplib/callback_api')

amqp.connect('amqp://guest:guest@127.0.0.1:5672', (error, connection) => {
  connection.createChannel(function(error1, channel) {
    if (error1) {
      throw error1;
    }
    var queue = 'hello';
    var msg = 'เป็นควยไรไอหน้าหีหน้าสัส';

    channel.assertQueue(queue, {
      durable: false
    });

    channel.sendToQueue(queue, Buffer.from(msg));
    console.log(" [x] Sent %s", msg);
  });

  setTimeout(function() { 
    connection.close(); 
    process.exit(0) 
    }, 500);
})