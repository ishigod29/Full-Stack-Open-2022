require('dotenv').config()

const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()

const Person = require('./models/person')

app.use(express.static('build'))
app.use(express.json())
app.use(cors())

app.use(
  morgan('dev', {
    skip: function (req, res) {
      return res.statusCode < 400
    },
  })
)

app.use(morgan('combined'))

app.get('/', (request, response) => {
  response.send(
    '<h1>Welcome to de phonebook Api</h1> <br> <a href="/api/persons">View Data</a>'
  )
})

app.get('/info', (request, response) => {
  const date = new Date()

  Person.find({}).then((result) => {
    response.send(
      ` 
      <p>Phonebook has ${result.length} info for people</p>
      <p>${date}</p>
      `
    )
  })
})

app.get('/api/persons', (request, response, next) => {
  Person.find({})
    .then((persons) => {
      response.json(persons)
    })
    .catch((error) => next(error))
})

app.post('/api/persons', (request, response, next) => {
  const body = request.body

  Person.find({ name: body.name })
    .then((filterPerson) => {
      if (body.name.length === 0 && body.name.length === 0) {
        return response.status(400).json({
          error: 'content missing',
        })
      } else if (filterPerson.length > 0) {
        return response.status(409).json({
          error: `${body.name} already exists in the phonebook`,
        })
      }

      const person = new Person({
        name: body.name,
        number: body.number,
      })

      person
        .save()
        .then((savedPerson) => {
          response.json(savedPerson)
        })
        .catch((error) => next(error))
    })
    .catch((error) => next(error))
})

app.get('/api/persons/:id', (request, response, next) => {
  const id = request.params.id

  Person.findById(id)
    .then((person) => {
      response.json(person)
    })
    .catch((error) => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body
  const id = request.params.id

  const person = {
    name: body.name,
    number: body.number,
  }

  Person.findByIdAndUpdate(id, person, { new: true })
    .then((updatePerson) => {
      response.json(updatePerson)
    })
    .catch((error) => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
  const id = request.params.id

  Person.findByIdAndRemove(id)
    .then(() => {
      response.status(204).end()
    })
    .catch((error) => next(error))
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.log(error.name)

  switch (error.name) {
  case 'CastError':
    response.status(400).send({ error: 'malformatted id' })
    break

  case 'ValidationError':
    response
      .status(409)
      .send({
        error:
            'the name must be unique and have at least 3 characters and the phone number at least 8 characters ',
      })
      .end()
    break

  default:
    response.status(500).send('Something broke!')
    break
  }

  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
