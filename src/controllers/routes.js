const express = require('express');
const {sendEmail} = require('../data/data');

const routes = express.Router();

const text = {
    text: 'Trabalho AV2',
    user1: 'Emanuelle Neves',
    user2: 'Rafael Tavares',
    user3: 'Matheus Rodrigues',
    user4: 'Dante Dantas',
    user5: 'João Monteiro',

}

routes.get('/', (req, res) => res.send(text));

// Envie um e-mail com no formato abaixo utilizando as informações coletadas;
routes.get('/sendEmail', (req, res) => res.render('home', {dataEmail: null}));

routes.post('/sendEmail', (req, res) => {
    const {emailClient} = req.body; 
    const {numero} = req.body;
    const {valor} = req.body;
    const {data} = req.body;

    const dataEmail = sendEmail(emailClient, parseInt(numero), parseFloat(valor), data);
    // console.log(emailClient, numero, valor, data);

    return res.status(200).json({ message: 'Email enviado com sucesso!', dataEmail });
});

//  Envie uma mensagem com um número do pedido e o valor;
routes.post('/messagePedido', (req, res) => {
    
});

module.exports = routes;