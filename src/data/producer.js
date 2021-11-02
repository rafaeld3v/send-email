const amqplib = require('amqplib/callback_api');

function sendMessage(numero, valor, data){
  amqplib.connect('amqp://localhost', function(err, conn){

    try{
      conn.createChannel(function(err, channel){
        const queue = 'Trabalho AV2';
        
        let message = {
          numero: numero,
          valor: valor,
          data: data
        }
        channel.assertQueue(queue, {
          durable: false
        });
        channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)));

        console.log('Message sent successfully', message);
      });
    }
    catch(err){
      return err;
    }

    setTimeout(function() {
      connection.close();
      process.exit(0);
    }, 500);

  });

  console.log('deu bom, passou pelo sendMessage', numero, valor, data);
}

module.exports = {sendMessage}