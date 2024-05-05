const express = require('express')
const { Sequelize, DataTypes } = require('sequelize')
const app = express()
const porta = 3000

app.use(
  express.json(),
  express.urlencoded({
    extended: true,
  })
)

const sequelize = new Sequelize('escola', 'postgres', 'postgres', {
  host: 'localhost',
  dialect: 'postgres'
})

function conexaoDb() {
  try {
    sequelize.authenticate()
    console.log('Conexão com Banco de Dados OK');
  } catch (erro) {
    console.log('Não foi possível conectar-se ao banco');
  }
}
conexaoDb()

const Professor = sequelize.define('professor', {
  nome: {
    type: DataTypes.STRING,
    allowNull: false, 
  },
  cpf: {
    type: DataTypes.STRING,
    allowNull: false, 
  },
  data_nascimento: {
    type: DataTypes.DATE,
    allowNull: false, 
  },
  logadouro: {
    type: DataTypes.STRING,
    allowNull: false, 
  },
  bairro: {
    type: DataTypes.STRING,
    allowNull: false, 
  },
  cidade: {
    type: DataTypes.STRING,
    allowNull: false, 
  },
  estado: {
    type: DataTypes.STRING,
    allowNull: false, 
  },
  cep: {
    type: DataTypes.STRING,
    allowNull: false, 
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false, 
  },
}, {
  timestamps: false, 
  freezeTableName: true, 
})

// Professor.sync({ force: true })

app.get('/inicio', (req, res) => {
  res.send('Inicio da API')
})

app.post('/projeto-escolar/professor/', async (req, res) => {
  const {
    nome,
    cpf,
    data_nascimento,
    logadouro,
    bairro,
    cidade,
    estado,
    cep,
    email,
  } = req.body
  try {
    const novoProfessor = await Professor.create({
      nome,
      cpf,
      data_nascimento,
      logadouro,
      bairro,
      cidade,
      estado,
      cep,
      email,
    })

    res.status(201).json({
      msg: 'Professor Cadastrado com Sucesso',
      dados: novoProfessor,
      status: 201,
    })
  } catch (error) {
    res.status(400).json({
      msg: error.message,
      status: 400
    })
  }
})
app.put('/projeto-escolar/professor/:id', async (req, res) => {
  const {id} = req.params
  const {
    nome,
    cpf,
    data_nascimento,
    logadouro,
    bairro,
    cidade,
    estado,
    cep,
    email,
  } = req.body
  try {
    await Professor.update({
      nome,
      cpf,
      data_nascimento,
      logadouro,
      bairro,
      cidade,
      estado,
      cep,
      email,
    }, {
      where: { id },
    })

    res.status(200).json({
      msg: 'Dados do professor atualizados',
      status: 200,
    })
  } catch (error) {
    res.status(400).json({
      msg: error.message,
      status: 400
    })
  }
})
app.delete('/projeto-escolar/professor/:id', async (req, res) => {
  const {id} = req.params
  try {
    await Professor.destroy({
      where: { id },
    })

    res.status(200).json({
      msg: 'Dados do professor deletados',
      status: 200,
    })
  } catch (error) {
    res.status(400).json({
      msg: error.message,
      status: 400
    })
  }
})
app.get('/projeto-escolar/professor/:id', async (req, res) => {
  const {id} = req.params
  try {
    const professor = await Professor.findByPk(id)
    res.status(200).json(professor)

  } catch (error) {
    res.status(400).json({
      msg: error.message,
      status: 400
    })
  }
})
app.get('/projeto-escolar/professor/', async (req, res) => {
  try {
    const todosProfessores = await Professor.findAndCountAll()
    res.status(200).json(todosProfessores)
  } catch (error) {
    res.status(400).json({
      msg: error.message,
      status: 400
    })
  }
})

app.listen(porta, () => console.log('servidor ok'))