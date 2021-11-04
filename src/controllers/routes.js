const express = require('express');
const {producerQueue}  = require('../data/producer');
const {consumer} = require('../data/consumer');

const routes = express.Router();

const text = {
    text: 'Trabalho AV2',
    user1: 'Emanuelle Neves',
    user2: 'Rafael Tavares',
    user3: 'Dante Dantas',
    user4: 'Matheus Rodrigues',
    user5: 'João Monteiro'
}

routes.get('/', (req, res) => res.send(text));

// Envie uma mensagem com um número do pedido e o valor;
// Envie um e-mail com no formato abaixo utilizando as informações coletadas;
routes.get('/receiveMessage', (req, res) => res.render('pedido'));

routes.post('/receiveMessage', function (req, res, error) {
    const {numero} = req.body;
    const {valor} = req.body;
    const {data} = req.body;
    const {emailClient} = req.body;

    const pedido = producerQueue(parseInt(numero), parseFloat(valor), data); 
    const mail = consumer(emailClient);

    if (error instanceof Error) {
        console.error(error);
        return res.status(400).json({ message: 'Pedido não cadastrado!' });
    }

    return res.status(200).json({ message: 'Pedido cadastrado com sucesso!', pedido, mail});
});

module.exports = routes;