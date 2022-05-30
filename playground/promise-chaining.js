require('../src/db/mongoose')
const User = require('../src/models/user')

//6293dd8c7620e6bceb36885a

// User.findByIdAndUpdate('62941d10f3a44450e9695770', { age: 1 }).then((user) => {
//     console.log(user)
//     return User.countDocuments({ age: 1 })
// }).then((result) => {
//     console.log(result)
// }).catch((e) => {
//     console.log(e)
// })

const updateAgeAndCount =  async (id, age) => {
    const user = await User.findByIdAndUpdate(id, { age })
    const count = await User.countDocuments({ age })
    return count
}

updateAgeAndCount("62941d10f3a44450e9695770", 2).then((count) => {
    console.log(count)
}).catch((e) => {
    console.log(e)
})