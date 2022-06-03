const express = require ('express')
const User = require ('../models/user')
const router = new express.Router()

//Create a user with POST method
router.post('/users', async (req, res) => {
    const user = new User(req.body)
    try {
        await user.save()
        res.status(201).send(user)
    } catch (e) {
        res.status(400).send()
    }
})

router.post('/users/login', async (req,res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        res.send(user)
    } catch (e) {
        res.status(400).send(e)
    }
})




//Fetch multiple users with GET method. All users with an empty object in find() statement
router.get('/users', async (req, res) => {
    try {  
        const users = await User.find({})
        res.send(users)
    } catch (e) {
        res.status(500).send()
    }
})

//Fetch specific user by ID with GET method. 
router.get('/users/:id', async (req, res) => {
    const _id = req.params.id  
    try {
        const user = await User.findById(_id)
        if (!user) {
            return res.status(404).send()
        }
        res.send(user)
    } catch (e) {
        res.status(500).send()
    }
})

//Patch specific user by ID with PATCH method. 
router.patch(('/users/:id'), async (req, res) => {
    
    const requestedUpdates = Object.keys(req.body)
    const allowedUpdates = ['name','email','password','age']
    const isValidOp = requestedUpdates.every((update) => allowedUpdates.includes(update))
    if (!isValidOp) {
        return res.status(400).send({error: 'Invalid update key'})
    }
    try {
        const user = await User.findById(req.params.id)

        if (!user) {
            return res.status(404).send()
        }
        requestedUpdates.forEach((update) => user[update] = req.body[update])
        await user.save()
        res.send(user)
    } catch (e) {
        res.status(400).send(e)
    }
})

//Delete a user with specified ID
router.delete('/users/:id', async (req, res) => {
    const _id = req.params.id
    try {
        const user = await User.findByIdAndDelete(_id)
        if (!user) {
            return res.status(404).send()
        }
        res.send(user)
    } catch (e) {
        res.status(500).send(e)
    }
})

module.exports = router