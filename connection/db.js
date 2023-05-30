const mongoose = require('mongoose')

const URL ="mongodb+srv://ainansalaha77:Ainansalaha77@pratice.9a4og4d.mongodb.net/?retryWrites=true&w=majority"

const connection = async()=>{
    try {
        await mongoose.connect(URL)
        console.log('connected to db')
    } catch (error) {
        console.log(`db.js--> ${error}`)
    }
}
module.exports=connection