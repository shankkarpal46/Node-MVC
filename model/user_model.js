const mongoose = require('mongoose')

mongoose.connect("mongodb://127.0.0.1:27017/dataconnect")
    .then(()=>console.log('MongoDB connected.'))
    .catch(err=>console.log('Mongo Error',err))

const userSchema = new mongoose.Schema({
    firstName:{
        type: String,
        required:true
    },

    lastName:{
        type: String
    },

    email:{
        type: String,
        required: true,
        unique: true
    },

    job_Title:{
        type: String
    },

    gender:{
        type: String
    },
    
},{timestamps:true})

const User = mongoose.model("user",userSchema)

module.exports = User