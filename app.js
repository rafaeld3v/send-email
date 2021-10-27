const express = require('express');
const nodemailer = require('nodemailer');
const anqp = require('anqplib/callback_api');
const app = express();
const port = 3333;

app.get('/', (req, res) => res.send('TUDO FUNCIONADNO!'));

app.get('/send', (req, res) => res.send('TUDO FUNCIONADNO!'));

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
let valor = 5000;
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

transporter.sendMail(mailOptions, (err, info) => {
  if (err) console.log(err);
  else console.log(info);
});
