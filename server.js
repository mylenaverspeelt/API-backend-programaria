
const express = require("express") //todos os poderes do servidor vem daqui
const router = express.Router() //constante que armazena a rota de pagina 
const cors = require('cors') //permite integração com o front
const app = express() //cria uma aplicação express
const conexaoDatabase = require('./database') //arquivo onde faz a conexão com o bd
conexaoDatabase()
app.use(express.json()) //permite enviar e receber infos em json
app.use(cors())   //libera a aplicação pra ser usada pelo front-end
const Voluntarie = require('./voluntarieModel') //model com o schema do objeto a ser salvo no bd

//LISTEN na porta especifica que o servidor vai ser iniciado
app.listen(3333, () => {
    console.log(`Servidor iniciado em: http://localhost:3333`)
})

//GET pra receber infos do servidor 
app.use(router.get('/voluntaries', async (req, res) => {
    try {
        res.json(await Voluntarie.find())   //devolve pro usuario a lista recebida do BD
    } catch (error) {
        console.log(error)
    }
}))

//POST para envio de dados pro servidor 
app.use(router.post('/voluntaries', async (req, res) => {
    const novaPessoaVoluntaria = new Voluntarie({
        nome: req.body.nome,
        imagem: req.body.imagem,
        bio: req.body.bio
    })   // novo objeto model com schema do mongoose

    try {
        res.status(201).json(await novaPessoaVoluntaria.save())   //devolve pro usuario o status 201 e salva um voluntarie no BD
    } catch (error) {
        console.log(error)
    }
}))

//PATCH pra enviar pro servidor dados alterados pelo user após ter cadastrado antes 
app.use(router.patch('/voluntaries/:id', async (req, res) => {
    try {
        const pessoaEncontrada = await Voluntarie.findById(req.params.id)  //procura voluntarie no BD pelo ID passado pelo user

        if (req.body.nome) {
            pessoaEncontrada.nome = req.body.nome
        }
        if (req.body.imagem) {
            pessoaEncontrada.imagem = req.body.imagem
        }
        if (req.body.bio) {
            pessoaEncontrada.bio = req.body.bio
        }

        res.json(await pessoaEncontrada.save())  //salva a nova pessoa voluntaria no BD
    } catch (error) {
        console.log(error)
    }
}
))

//DELETE
app.use(router.delete('/voluntaries/:id', async (req, res) => {
    try {
        await Voluntarie.findByIdAndDelete(req.params.id)
        res.json({ menssagem: 'Pessoa voluntária deletada com sucesso!' })
    } catch (error) {
        console.log(error)
    }
}))

// aqui são utilizados alguns métodos do próprio mongoose, como por ex: save(), find(), findById(), findByIdAndDelete() 