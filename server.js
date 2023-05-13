
const express = require("express") //todos os poderes do servidor vem daqui
const router = express.Router() //constante que armazena a rota de pagina 
const cors = require('cors')
const app = express() //cria uma aplicação express
const conexaoDatabase = require('./database') //arquivo onde faz a conexão com o bd
conexaoDatabase()
app.use(express.json()) //permite enviar e receber infos em json
app.use(cors())   //libera a aplicação pra ser usada pelo front-end
const Mulher = require('./mulherModel') //model com o schema do objeto a ser salvo no bd

//LISTEN na porta especifica que o servidor vai ser iniciado
app.listen(3333, () => {
    console.log(`Servidor iniciado em: http://localhost:3333`)
})

//GET pra receber infos do servidor 
app.use(router.get('/mulheres', async (req, res) => {
    try {
        let listaEncontrada = await Mulher.find()
        res.json(listaEncontrada)   //devolve pro usuario a lista recebida do BD
    } catch (error) {
        console.log(error)
    }
}))

//POST para envio de dados pro servidor 
app.use(router.post('/mulheres', async (req, res) => {

    const novaMulher = new Mulher({
        nome: req.body.nome,
        imagem: req.body.imagem,
        bio: req.body.bio
    })   // novo objeto model com schema do mongoose

    try {
        res.status(201).json(await novaMulher.save())   //devolve pro usuario o status 201 e salva uma mulher no BD
    } catch (error) {
        console.log(error)
    }
}))

//PATCH pra enviar pro servidor dados alterados pelo user após ter cadastrado antes 
app.use(router.patch('/mulheres/:id', async (req, res) => {

    try {
        const mulherEncontrada = await Mulher.findById(req.params.id)  //procura mulher no BD pelo ID passado pelo user

        if (req.body.nome) {
            mulherEncontrada.nome = req.body.nome
        }
        if (req.body.imagem) {
            mulherEncontrada.imagem = req.body.imagem
        }
        if (req.body.bio) {
            mulherEncontrada.bio = req.body.bio
        }

        res.json(await mulherEncontrada.save())  //salva a nova mulher no BD
    } catch (error) {
        console.log(error)
    }
}
))

//DELETE solicita ao servidor que apague algo
app.use(router.delete('/mulheres/:id', async (req, res) => {

    try {
        await Mulher.findByIdAndDelete(req.params.id)
        res.json({ menssagem: 'Mulher deletada com sucesso!' })
    } catch (error) {
        console.log(error)
    }
}))

// aqui são utilizados alguns métodos do próprio mongoose, como por ex: save(), find(), findById(), findByIdAndDelete() 