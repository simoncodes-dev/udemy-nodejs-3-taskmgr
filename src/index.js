require('./db/mongoose')
const express = require('express')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})

// const Task = require ('./models/task')
// const User = require ('./models/user')

// const main = async () => {
//     // const task = await Task.findById('629bc59f9c1662bf4be15b0a')
//     // await task.populate('owner')
//     // console.log(task.owner)

//     const user = await User.findById('629bc4e961a7efb3096841a0')
//     await user.populate('tasks')
//     console.log(user.tasks)

// }

// main()