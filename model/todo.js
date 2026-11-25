const mongoose = require('mongoose');

let user = require('../model/user')

const todoSchema = new mongoose.Schema({

    title : String,
    description: String,
    date: String,
    start: String,
    end: String,
    completed:{
        type:Boolean,
        default:false
    },

    owner:{
        required:true,
        ref:user,
        type:mongoose.Schema.Types.ObjectId
    }

})


module.exports=mongoose.model('Todo',todoSchema);

























