const nodemailer = require('nodemailer');

function sendEmail(emailClient, numero, valor, data){
  // console.log('Other: ',emailClient, numero, valor, data);

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        port: 3001,
        secure: true, 
        logger: true,
        debug: true,
        secureConnection: false,
        requireTLS: true,
        
        auth: {
          user:  'example.mail123212@gmail.com',
          pass: 'Ss12345678',
        },

        tls:{
          rejectUnauthorized:false
        },

        connectionTimeout: 5 * 60 * 1000, // 5min
        
      });
      
      const mailOptions = {
        from: 'example.mail123212@gmail.com', 
        to: emailClient, 
        subject: 'Subject of your email', 
        html: `<p> Prezado Cliente, o pedido: ${numero} com o total de R${valor} foi cadastrado com sucesso. O prazo de entrega será até ${data}.</p>`, 
      };
 
      // ENVIAR EMAIL
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) console.log(error);
        else console.log(info);
      });
}

module.exports = {
    sendEmail,
}