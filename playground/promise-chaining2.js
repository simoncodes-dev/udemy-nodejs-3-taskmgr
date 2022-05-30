require ('../src/db/mongoose')
const Task = require('../src/models/task')

// Task.findByIdAndDelete('62941f6beb59164881920c74').then((query) => {
//     console.log(query)
//     return Task.countDocuments({completed: false})
// }).then((count) => {
//     console.log(count)
// }).catch((e) => {
//     console.log(e)
// })

const deleteTaskAndCount = async (id) => {
    const task = await Task.findByIdAndDelete(id)
    const count = await Task.countDocuments({ completed: false })
    return count
}

deleteTaskAndCount('6295136fc04df35b134d02bd').then((count) => {
    console.log('Completed is false:', count)
}).catch((e) => {
    console.log('error', e)
})