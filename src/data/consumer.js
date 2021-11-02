const amqplib = require('amqplib/callback_api');
const {sendEmail} = require('./sendEmail');

function receiveMessage(emailClient){
    amqplib.connect(process.env.urlQueue, function(err, conn) {
      if(err){
        console.error(err);
      }
      conn.createChannel(function(err, channel) {
          let queue = 'av2-unifor';
      
          channel.assertQueue(queue, {
            durable: false
          });
  
          channel.consume(queue, function(message) {
            let messagePedido = JSON.parse(message.content);
            const msg = `<p> O pedido de número ${messagePedido.numero} com o total de R$ ${messagePedido.valor} foi cadastrado com sucesso. O prazo de entrega será até o dia ${messagePedido.data}. </p>`;

            if((messagePedido.numero && messagePedido.valor && messagePedido.data) != undefined){
              sendEmail(emailClient, msg);
            } 
            else{
              console.log("E-mail não enviado!")
            }
          }, {
            noAck: true
          })
      });

        // try{

        // }catch(err){
        //   if (err instanceof Error) {
        //     console.log(err);
        //   }
        // }
    });

    console.log('deu bom, passou pelo receiveMessage', emailClient);
}

module.exports = {receiveMessage}