const mongoose = require('mongoose')

const MulherSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true
    },
    imagem: {
        type: String,
        required: true
    },
    bio: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('listaMulhere', MulherSchema)
//quem coloca o s é o proprio mongo
//o id quem gera é o proprio mongo na hora que você salva um objeto novo