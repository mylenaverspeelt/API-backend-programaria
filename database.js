const mongoose = require('mongoose')
require('dotenv').config()

async function conexaoDatabase() {
    try {
        console.log('Conexão com o banco de dados iniciada')
        await mongoose.connect(process.env.MONGO_URL) //string de conexão
        console.log('Conexão com o banco de dados feita com sucesso.')

    } catch (error) {
        console.log(error)
    }

}

module.exports = conexaoDatabase


// o parâmetro desse mongoose.connect é a string de conexão com o BD, porem como esse é um dado sensível, ela é guardada no arquivo .env (que é colocado no gitignore).

// pra usar esse pacote env tem que npm i dotenv

//tambem cria-se um arquivo .env_example, que é pra qdo alguem baixar o código saber quais as configurações de ambiente, quais constantes usar...


