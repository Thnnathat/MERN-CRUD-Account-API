const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const { User } = require('../models/User')

router.post('/', async (req, res) => {
    let user = new User({
        name: req.body.name,
        email: req.body.email,
        passwordHash: bcrypt.hashSync(req.body.password, 10),
        phone: req.body.phone,
        isAdmin: req.body.isAdmin
    })

    // return data
    user = await user.save()

    if(!user) return res.status(404).send('The user cannot be created.')

    res.send(user)
})

router.post('/login', async (req, res) => {
    const user = await User.findOne( {email: req.body.email })

    if(!user) return res.status(400).send('The user not found.')

    if(user && bcrypt.compareSync(req.body.password, user.passwordHash)) {
        const token = jwt.sign(
            {
                userId: user.id,
                isAdmin: user.isAdmin
            },
            process.env.SECRET_KEY,
            {
                expiresIn: '1d'
            }
        )

        return res.status(200).send({ user: user.email, token: token })
    } else {
        return res.status(400).send('Password is wrong.')
    }
})

module.exports = router