const amqp = require('amqplib/callback_api');
const {sendEmail} = require('./sendEmail');

function consumer(emailClient){
  amqp.connect('amqp://guest:guest@localhost', function(err, conn){
  if(err){
    console.error(err);
  }
  conn.createChannel((err, channel) => {
    
    if(err){
      console.error(err);
    }
    const queue = 'listen';
    channel.assertQueue(queue, { durable: false });

    console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);
    
    channel.consume(queue, function(message) {
      const {numero, valor, data} = JSON.parse(message.content);
      const msg = `<p> O pedido de número ${numero} com o total de R$ ${valor} foi cadastrado com sucesso. O prazo de entrega será até o dia ${data}. </p>`;

      if((numero && valor && data && emailClient) != null){
        sendEmail(emailClient, msg);
        console.log("Send email: ", numero, valor, data, emailClient)
      } 
      else{
        console.log("E-mail não enviado!")
      }
    }, {
      noAck: true
    });
  });
  });
}

module.exports = {consumer}