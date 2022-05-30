require ('../src/db/mongoose')
const Task = require('../src/models/task')

Task.findByIdAndRemove('62941f6beb59164881920c74').then((query) => {
    console.log(query)
    return Task.countDocuments({completed: false})
}).then((count) => {
    console.log(count)
}).catch((e) => {
    console.log(e)
})