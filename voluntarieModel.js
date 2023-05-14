const mongoose = require('mongoose')

const VoluntarieSchema = new mongoose.Schema({
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

module.exports = mongoose.model('listaVoluntarie', VoluntarieSchema)

//quem coloca o s é o proprio mongo
//o id quem gera é o proprio mongo na hora que você salva um objeto novo