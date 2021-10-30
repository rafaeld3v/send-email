const app = require('./app');

const port = 3001;

app.listen(process.env.port || port, () => console.log('server running port:', port));