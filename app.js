const express = require('express');
const nodemailer = require('nodemailer');
const app = express();
const port = 3333;

app.get('/', (req, res) => res.send('Servidor ligado!'));

app.listen(port, (err) => {
  console.log(`Server is listening on ${port}.`);
});

let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'rafaeld3v@edu.unifor.br',
    pass: '55082001',
  },
});

let numero = 587615274;
let valor = 3000;
let data = '26/10/2021';

const mailOptions = {
  from: 'rafaeld3v@edu.unifor.br', // sender address
  to: 'rafaelcontato.ce@gmail.com', // receiver (use array of string for a list)
  subject: 'Subject of your email', // Subject line
  html: `<p> O pedido ${numero} com o total de R$${valor} foi cadastrado com sucesso. O prazo de entrega será até ${data}.</p>`, // plain text body
};

/* Antes de enviar seu e-mail usando o gmail, 
  você deve permitir que aplicativos não seguros acessem o gmail. 
  Para isso, acesse as configurações do gmail aqui . 
*/

// ENVIAR EMAIL
transporter.sendMail(mailOptions, (err, info) => {
  if (err) console.log(err);
  else console.log(info);
});
