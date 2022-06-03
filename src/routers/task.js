const express = require ('express')
const Task = require ('../models/task')
const router = new express.Router()

//Create a task with POST method
router.post('/tasks', async (req, res) => {
    const task = new Task(req.body)
    try {
        await task.save()
        res.status(201).send(task)
    } catch (e) {
        res.status(400).send(e)
    }
})

//Fetch multiple tasks with GET method.
router.get('/tasks', async (req, res) => {
    
    try {
        const tasks = await Task.find({})
        res.send(tasks)
    } catch (e) {
        res.status(500).send()
    }
})

//Fetch a single task by ID with GET method. 
router.get('/tasks/:id', async (req, res) => {
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

//Update a task with specified ID via PATCH method
router.patch('/tasks/:id', async (req, res) => {
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

//Delete a task with specified ID via DELETE method
router.delete('/tasks/:id', async (req, res) => {
    const _id = req.params.id
    try {
        const task = await Task.findByIdAndDelete(_id)
        if (!task) {
            return res.status(404).send()
        }
        res.send(task)
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router