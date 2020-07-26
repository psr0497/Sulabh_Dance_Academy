const express = require('express')

const router = express.Router();

const bodyParser = require('body-parser');

const bcrypt = require('bcryptjs')

const { check, validationResult } = require('express-validator');

const User =require('./../modals/user');



// middleware setup 

router.use(bodyParser.json());

router.use(bodyParser.urlencoded({extended:true}));

// routes 

router.get(

'/contact',

[
    check('email').isEmail().normalizeEmail(),
    check('phone').not().isEmpty()
],


function(req,res){

    const errors = validationResult(req);
    if (!errors.isEmpty()){

        return res.status(404).json({
            status:false,
            message: 'All not ok',
            errors: errors.array()
    });
}

    var name = req.query.name;

    var phone = req.query.phone;
    var email = req.query.email;
    var address = req.query.address;
    var desc = req.query.desc;


    var data = new User({

        name: name,
        phone: phone,
        email : email,
        address:address,
        desc:desc



    });



        console.log(name);
        
       data.save(function(error , result){
            if(error)
            {
                return res.status(404).end('404 Not Found');
            }
            return res.status(200).json({
                status:true,
                message:'your request is saved successfully',
                result: result
            }) 
    }
       )
}
);


/*router.post(
    '/signup',

    [
        check('email').isEmail().normalizeEmail(),
        check('password').not().isEmpty().trim().escape(),
       // check('confirm_password').not().isEmpty().trim().escape()
    ],

    function(req, res){

        const errors = validationResult(req);
        if(!errors.isEmpty())
        {
            return res.status(400).json({
                status:false,
                message:'sorry',
                errors:errors.array()
            })
        }

        var temp = new Sign({

            name : req.query.name,
            email : req.query.email,
            password:req.query.password,
            confirm_password: req.query.confirm_pass


        });

        temp.save(function(error, result){
            if(error)
            {
                return res.status(404).json({status:false,
                message:'your request is not saved',
               error:error
                });
            }
            return res.status(200).json({
                status:true,
                message:'your request is saved successfully ok',
                result: result

        });

    });

    }





)






*/


module.exports = router;