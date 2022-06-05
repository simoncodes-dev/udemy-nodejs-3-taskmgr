const express = require ('express')
const Task = require ('../models/task')
const auth = require ('../middleware/auth')
const router = new express.Router()

//Create a task with POST method
router.post('/tasks', auth, async (req, res) => {
    const task = new Task({
        ...req.body,
        owner: req.user._id
    })
    
    try {
        await task.save()
        res.status(201).send(task)
    } catch (e) {
        res.status(400).send(e)
    }
})

//Fetch multiple tasks with GET method.
router.get('/tasks', auth, async (req, res) => {
    
    try {
        await req.user.populate('tasks')
        res.send(req.user.tasks)
    } catch (e) {
        res.status(500).send()
    }
})

//Fetch a single task by ID with GET method. 
router.get('/tasks/:id', auth, async (req, res) => {
    const _id = req.params.id
    
    try {
        const task = await Task.findOne({ _id, owner: req.user._id })
        if (!task) {
            return res.status(404).send()
        }
        res.send(task)
    } catch (e) {
        res.status(500).send()
    }
})

//Update a task with specified ID via PATCH method
router.patch('/tasks/:id', auth, async (req, res) => {
    const _id = req.params.id
    const requestedUpdates = Object.keys(req.body)
    const allowedUpdates = ['description', 'completed']
    const isValidOp = requestedUpdates.every((update) => allowedUpdates.includes(update))

    if (!isValidOp) {
        return res.status(400).send('Invalid update key in request')
    }
    try {
        const task = await Task.findOne({ _id, owner: req.user._id })
        if (!task) {
            return res.status(404).send()
        }
        requestedUpdates.forEach((update) => task[update] = req.body[update])
        await task.save()
        res.send(task)
    } catch (e) {
        return res.status(500).send(e)
    }
})

//Delete a task with specified ID via DELETE method
router.delete('/tasks/:id', auth, async (req, res) => {
    const _id = req.params.id
    try {
        const task = await Task.findOneAndDelete({ _id, owner: req.user._id })
        if (!task) {
            return res.status(404).send()
        }
        res.send(task)
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router