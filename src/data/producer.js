const amqplib = require('amqplib/callback_api');

function sendMessage(numero, valor, data){
  amqplib.connect(process.env.urlQueue, function(err, conn){
    if(err){
      console.error(err);
    }
    conn.createChannel(function(err, channel){
      let queue = 'Trabalho AV2';
      
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

    // try{
    // }
    // catch(err){
    //   if (err instanceof Error) {
    //     console.log(err);
    //   }
    // }
    setTimeout(function() { conn.close(); process.exit(0) }, 500);
  });

  console.log('deu bom, passou pelo sendMessage', numero, valor, data);
}

module.exports = {sendMessage}