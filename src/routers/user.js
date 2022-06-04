const express = require ('express')
const User = require ('../models/user')
const auth = require('../middleware/auth')
const router = new express.Router()

//Create a user with POST method
router.post('/users', async (req, res) => {
    const user = new User(req.body)
    try {
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({user, token})
    } catch (e) {
        res.status(400).send(e)
    }
})

router.post('/users/login', async (req,res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.send({ user, token })
    } catch (e) {
        res.status(400).send(e)
    }
})

router.post('/users/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.user.save()
        res.send()

    } catch (e) {
        res.status(500).send(e)
    }
})

router.post('/users/logoutAll', auth, async (req, res) => {
    try {
        req.user.tokens = []
        await req.user.save()
        res.send()

    } catch (e) {
        res.status(500).send(e)
    }

})

//Fetch multiple users with GET method. All users with an empty object in find() statement
router.get('/users/me', auth, async (req, res) => {
    res.send(req.user)
})

//Patch specific user by ID with PATCH method. 
router.patch(('/users/me'), auth, async (req, res) => {
    
    const requestedUpdates = Object.keys(req.body)
    const allowedUpdates = ['name','email','password','age']
    const isValidOp = requestedUpdates.every((update) => allowedUpdates.includes(update))
    if (!isValidOp) {
        return res.status(400).send({error: 'Invalid update key'})
    }
    try {
        requestedUpdates.forEach((update) => req.user[update] = req.body[update])
        await req.user.save()
        res.send(req.user)
    } catch (e) {
        res.status(400).send(e)
    }
})

//Delete a user with specified ID
router.delete('/users/me', auth, async (req, res) => {
    try {
        await req.user.remove()
        res.send(req.user)
    } catch (e) {
        res.status(500).send(e)
    }
})

module.exports = router