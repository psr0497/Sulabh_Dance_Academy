const mongoose = require('mongoose')

const userSchema = mongoose.Schema(

    {
        name: {
            type: String,
            require:true
        },

        email :{
            type: String,
            require:true
        },

        phone :{
            type: Number,
            require:true
        },

        address:{
            type: String,
            
        },

        desc:{
            type: String,
            require:true
        },

        message_date:{
            type: Date,
            default : Date.now()

        }

    }






);




mongoose.model('users',userSchema)



module.exports = mongoose.model('users') 

