const express = require('express');
const routes = express.Router();
const Produto = require('./produto');

routes.get("/produtos", (req,res)=>{
    let promise = new Produto().getProdutos();
    promise.then((data) => {
        res.json(data);
    });
});

routes.get("/produtos/:produto_id", async (req,res)=>{
    let produto = new Produto();
    await produto.getProduto(req.params.produto_id);
    if (produto.id != null) {
        res.json(produto);
    } else {
        res.send('Produto não encontrado.');
    }
});

module.exports = routes;