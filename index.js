const express = require('express');
const cors = require('cors');
const routes = require('./rotas');
const porta = 3000;

const app = express();

app.use(cors({
    origin: '*'
}));
app.use('/',routes);
app.get('*',(req,res)=>{
    res.send('404 - Requisição não encontrada.');
});

app.listen(porta,() => { console.log('Servidor Iniciado.') });