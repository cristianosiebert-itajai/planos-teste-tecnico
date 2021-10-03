const request = require('request');

Conversor = class Conversor {

    moeda_base = "BRL";
    url_api = "https://economia.awesomeapi.com.br/last/";
    options = {json:true};

    isMoedaBase(moeda) {
        return moeda == this.moeda_base ? true : false;
    }

    getCotacao(alvo) {
        if (!this.isMoedaBase(alvo)) {
            let url = this.url_api + this.moeda_base + '-' + alvo;
            return new Promise((resolve,reject) => {
                request(url, this.options, this.valor_convertido = (error, res, body) => {
                    if (error) { reject(error) };
                    if (!error && res.statusCode == 200) {
                        resolve(body[Object.keys(body)[0]]);
                    };
                });
            });
        }
    }
}

module.exports = Conversor;