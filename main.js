// Turkey breeds 33f

const token = '6a186c9bba8fd8b3503942a7845b94c1a0750341'
const urlGet = 'https://api.codenation.dev/v1/challenge/dev-ps/generate-data?token='

// ASCII
const inicio = 97
const fim = 122

// libs
const axios = require('axios')
const sha1 = require('js-sha1')
const fs = require('fs')
const arq = require('./saveFile.js')

function BuscaJson() {
    axios.get(urlGet + token)
        .then(function (response) {
            processaJson(response.data)
        })
        .catch(function (error) {
            console.log(error)
        })
}

function processaJson(content) {

    arq.save(content, 'problem.json')
    console.log('problem saved!')

    content = arq.load('problem.json') 

    // criação de objeto com conteúdo do json teste ;-)
    obj = {}
    obj.numero_casas = content.numero_casas
    obj.token = content.token
    obj.cifrado = content.cifrado
    obj.decifrado = content.decifrado
    obj.resumo_criptografico = content.resumo_criptografico

    // processa o texto cifrado
    let textoCifrado = obj.cifrado;
    textoCifrado = Array.from(textoCifrado)

    let str = ''

    textoCifrado.forEach(function (item, indice) {

        let code = retornaCharCode(textoCifrado[indice])

        // se o caracter faz parte do range processa
        if ((code >= inicio) && (code <= fim)) {

            code -= obj.numero_casas

            if (code < inicio) {
                str += String.fromCharCode(fim - (inicio - code) + 1)
            } else {
                str += String.fromCharCode(code)
            }
        } else {
            str += String.fromCharCode(code)
        }
    })

    // inclui as respostas no objeto e salva >> outra forma de fazer a mesma coisa ;-)
    obj.decifrado = str
    obj.resumo_criptografico = sha1(str)
    arq.save(obj, 'answer_obj.json')
    console.log('answer obj saved!')

    // inclui as respostas no json e salva
    content.decifrado = str
    content.resumo_criptografico = sha1(str)
    arq.save(content, 'answer.json')
    console.log('answer saved!')
}

function retornaCharCode(char) {
    return char.charCodeAt(0)
}

BuscaJson()