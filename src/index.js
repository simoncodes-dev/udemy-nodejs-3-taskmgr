const { response } = require('express')
require('./db/mongoose')
const User = require('./models/user')
const Task = require('./models/task')

const express = require('express')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

//Create a user with POST method
app.post('/users', async (req, res) => {
    const user = new User(req.body)

    try {
        await user.save()
        res.status(201).send(user)
    } catch (e) {
        res.status(400).send()
    }
})

//Fetch multiple users with GET method. All users with an empty object in find() statement
app.get('/users', async (req, res) => {

    try {  
        const users = await User.find({})
        res.send(users)
    } catch (e) {
        res.status(500).send()
    }
})

//Fetch specific user by ID with GET method. 
app.get('/users/:id', async (req, res) => {
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

app.patch(('/users/:id'), async (req, res) => {
    
    const requestedUpdates = Object.keys(req.body)
    const allowedUpdates = ['name','email','password','age']
    const isValidOp = requestedUpdates.every((update) => allowedUpdates.includes(update))
    if (!isValidOp) {
        return res.status(400).send({error: 'Invalid update key'})
    }

    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
        if (!user) {
            return res.status(404).send()
        }
        res.send(user)
    } catch (e) {
        res.status(400).send(e)
    }
})



//Create a task with POST method
app.post('/tasks', async (req, res) => {
    const task = new Task(req.body)
    try {
        await task.save()
        res.status(201).send(task)
    } catch (e) {
        res.status(400).send(e)
    }
})


//Fetch multiple tasks with GET method.
app.get('/tasks', async (req, res) => {
    
    try {
        const tasks = await Task.find({})
        res.send(tasks)
    } catch (e) {
        res.status(500).send()
    }
})

//Fetch a single task by ID with GET method. 
app.get('/tasks/:id', async (req, res) => {
    const _id = req.params.id
    
    try {
        task = await Task.findById(_id)
        if (!task) {
            return res.status(404).send()
        }
        res.send(task)
    } catch (e) {
        res.status(500).send()
    }
})

app.patch('/tasks/:id', async (req, res) => {
    const requestedUpdates = Object.keys(req.body)
    const allowedUpdates = ['description', 'completed']
    const isValidOp = requestedUpdates.every((update) => allowedUpdates.includes(update))
    if (!isValidOp) {
        return res.status(400).send('Invalid update key in request')
    }
    try {
        const task = await Task.findByIdAndUpdate(req.params.id,req.body,{ new: true, runValidators: true})
        if (!task) {
            return res.status(404).send()
        }
        res.send(task)
    } catch (e) {
        return res.status(500).send(e)
    }
})


app.listen(port, () => {
    console.log('Server is up on port ' + port)
})