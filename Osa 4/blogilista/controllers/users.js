const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (req, res, next) => {
    try {
        const users = await User
            .find({})
            .populate('blogs')
        res.json(users.map(u => u.toJSON()))
    } catch(exception) {
        next(exception)
    }
})

usersRouter.post('/', async (req, res, next) => {
    try {
        const body = req.body

        if (!body.password) {
            return res.status(400).json({ error: 'password missing' })
        }

        if (body.password.length < 3) {
            return res.status(400).json({ error: 'password is too short' })
        }

        const passwordHash = await bcrypt.hash(body.password, 10)

        const user = new User({
            userName: body.userName,
            name: body.name,
            passwordHash,
        })

        const savedUser = await user.save()

        res.json(savedUser)
    } catch (exception) {
        next(exception)
    }
})

module.exports = usersRouter