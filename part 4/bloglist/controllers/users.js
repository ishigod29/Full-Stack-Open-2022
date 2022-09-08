const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs', { title: 1, author: 1, url: 1, likes: 1 })

  response.json(users)
})

usersRouter.post('/', async (request, response) => {
  const body = request.body
  const password = body.password

  if(!password && password.length < 3){
    response.status(400).send({ error: 'send the password and must have at least 3 characters' })
  }else{
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = new User({
      username: body.username,
      name: body.name,
      passwordHash,
    })

    const savedUser = await user.save()

    response.json(savedUser)
  }



})

module.exports = usersRouter