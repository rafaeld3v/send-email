const amqp = require('amqplib/callback_api');
const {sendEmail} = require('./sendEmail');

function consumerQueue(emailClient){
  amqp.connect(process.env.urlQueue, function(err, conn) {
      if(err){
        console.error(err);
      }
      conn.createChannel(function(err, channel) {
          let queue = 'av2-unifor';
      
          channel.assertQueue(queue, {
            durable: false
          });
  
          channel.consume(queue, function(message) {
            let {numero, valor, data} = JSON.parse(message.content);
            const msg = `<p> O pedido de número ${numero} com o total de R$ ${valor} foi cadastrado com sucesso. O prazo de entrega será até o dia ${data}. </p>`;

            if((numero && valor && data) != undefined){
              sendEmail(emailClient, msg);
            } 
            else{
              console.log("E-mail não enviado!")
            }
          }, {
            noAck: true
          })
      });

    });

    console.log('deu bom, passou pelo receiveMessage', emailClient);
}

module.exports = {consumerQueue}