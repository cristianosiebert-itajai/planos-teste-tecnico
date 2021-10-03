const fs = require('fs');
var moedas_raw = fs.readFileSync('moedas.json');
var moedas = JSON.parse(moedas_raw);

Moeda = class Moeda {
    getMoedas() {
        return moedas;
    }
}

module.exports = Moeda;