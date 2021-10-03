const fs = require('fs');
const Conversor = require('./conversor');
const Moeda = require('./moeda');
var produtos_raw = fs.readFileSync('produtos.json');
var produtos = JSON.parse(produtos_raw);
var moedas = new Moeda().getMoedas();
var conversor = new Conversor();

Produto = class Produto {

    async getPrecos(precos) {
        for (let i=0; i<moedas.length; i++) {
            if (!conversor.isMoedaBase(moedas[i].abv)) {
                let cotacao = await conversor.getCotacao(moedas[i].abv);
                let preco =  precos.BRL * parseFloat(cotacao.ask);
                preco = parseFloat(preco.toFixed(2));
                precos[moedas[i].abv] = preco;

                if (precos.hasOwnProperty('BRL_promocao')) {
                    let preco_promocao =  precos.BRL_promocao * parseFloat(cotacao.ask);
                    preco_promocao = parseFloat(preco_promocao.toFixed(2));
                    precos[moedas[i].abv + "_promocao"] = preco_promocao;
                }
            }
        }
        return precos;
    }

    async getProdutos() {
        for (let j=0; j<produtos.length; j++) {
            produtos[j].precos = await this.getPrecos(produtos[j].precos);
        }
        return produtos;
    }

    async getProduto(id) {
        let obj = produtos.find((produto) => {
            if (produto.id == id) { return true; }
        });
        if (obj != undefined) {
            this.id = obj.id;
            this.nome = obj.nome;
            this.modelo = obj.modelo;
            this.pareclas = obj.parcelas;
            this.precos = await this.getPrecos(obj.precos);
        } else {
            this.id = null;
            this.nome = null;
            this.modelo = null;
            this.pareclas = 0;
            this.precos = { BRL: 0 };
        }
    }

}

module.exports = Produto;