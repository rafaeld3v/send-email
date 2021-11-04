const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
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
  subject: 'Pedido realizado com sucesso!', 
};

const sendEmail = (emailClient, message) => {
  // ENVIAR EMAIL
  transporter.sendMail(Object.assign(mailOptions, {html: message, to: emailClient}), (error, info) => {
    if (error) console.log(error);
    else console.log(info);
  });
}

module.exports = {sendEmail}