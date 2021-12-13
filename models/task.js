const mongoose = require('mongoose')

//so what is a schema
const TaskSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Must Provide Your Name"],
        trim:true,
        maxlength:[20,'Name cannot exceed 20 characters']
    },
    completed:{
        type:Boolean,
        default:false
    }
})
//This is basic validation not advanced
module.exports = mongoose.model('Task',TaskSchema)
