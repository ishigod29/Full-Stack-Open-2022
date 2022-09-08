const logger = require('./logger')

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
  logger.error(error.name, error.message )

  switch (error.name) {
  case 'CastError':
    response.status(400).send({ error: 'malformatted id' })
    break

  case 'JsonWebTokenError':
    response.status(401).send({ error: 'token missing or invalid' })
    break

  case 'ValidationError':
    response.status(400).send({ error: error.message })
    break

  case 'SyntaxError':
    response.status(400).send({ error: error.message })
    break

  default:
    response.status(500).send({ error: 'fatal error server' })
    break
  }

  next(error)
}

const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization')

  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    request['token'] = authorization.substring(7)
  }

  next()
}

module.exports = {
  unknownEndpoint,
  errorHandler,
  tokenExtractor
}