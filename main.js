// Turkey breeds 33f

const token = '6a186c9bba8fd8b3503942a7845b94c1a0750341';
const urlGet = 'https://api.codenation.dev/v1/challenge/dev-ps/generate-data?token=';

// ASCII
const inicio = 97;
const fim = 122;

// libs
let axios = require('axios');
sha1 = require('js-sha1');
let fs = require('fs');

function BuscaJson() {
    axios.get(urlGet + token)
        .then(function (response) {
            processaJson(response.data);
        })
        .catch(function (error) {
            console.log(error);
        })
}

function processaJson(answer) {

    fs.appendFile('problem.json', JSON.stringify(answer), function (err) {
        if (err) throw err;
        console.log('Saved!');
    });

    // teste obj
    obj = {};
    obj.numero_casas = answer.numero_casas;
    obj.token = answer.token;
    obj.cifrado = answer.cifrado;
    obj.decifrado = answer.decifrado;
    obj.resumo_criptografico = answer.resumo_criptografico;

    // processa o texto cifrado
    let textoCifrado = obj.cifrado;
    textoCifrado = Array.from(textoCifrado);

    let str = '';

    textoCifrado.forEach(function (item, indice) {

        let code = retornaCharCode(textoCifrado[indice]);

        // se o caracter faz parte do range processa
        if ((code >= inicio) && (code <= fim)) {

            code -= obj.numero_casas;

            if (code < inicio) {
                str += String.fromCharCode(fim - (inicio - code) + 1)
            } else {
                str += String.fromCharCode(code);
            }
        } else {
            str += String.fromCharCode(code);
        }
    })
    obj.decifrado = str;
    answer.decifrado = str;
    answer.resumo_criptografico = sha1(str);

    fs.appendFile('answer.json', JSON.stringify(answer), function (err) {
        if (err) throw err;
        console.log('Saved!');
    });
}

function retornaCharCode(char) {
    return char.charCodeAt(0);
}

BuscaJson();