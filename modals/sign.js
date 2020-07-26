
const mongoose = require('mongoose')



const signupSchema = mongoose.Schema({

    name: {
        type: String,
        require:true
    },

    email :{
        type: String,
        require:true
    },

    password:{

        type:String,
        require:true

    },

    confirm_password :{

        type:String,
        require:true

    }

});


mongoose.model('signup',signupSchema)

module.exports= mongoose.model('signup');