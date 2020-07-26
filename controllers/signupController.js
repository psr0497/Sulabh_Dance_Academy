const express = require('express')

const router = express.Router();

const bodyParser = require('body-parser');

const bcrypt = require('bcryptjs')

const { check, validationResult } = require('express-validator');

const assert = require('assert');


const  Sign =require('./../modals/sign');




router.use(bodyParser.json());

router.use(bodyParser.urlencoded({extended:true}));



router.post(
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
            });
        }

        var email = req.body.email;
        var name = req.body.name;       
        var password = req.body.password;
        var confirm_password = req.body.confirm_password;
    
    
        var temp = new Sign({
    
            
           
            email : email,
            name: name,
            password:password,

            confirm_password:confirm_password
    
    
    
        });
        
       

        

        if (password==confirm_password){
        temp.save(function(error, result){
            if(error)
            {
                return res.status(404).json({status:false,
                message:'your request is not saved',
               error:error
                });
            }
            return res.status(200).redirect('../../')

    });
            } else {
                return res.status(404).end("404");
            

    }



  }

);




// for Login 


router.post(
    '/login',
    [
      // check not empty fields
      check('password').not().isEmpty().trim().escape(),
      check('email').isEmail().normalizeEmail()
    ],
    function(req, res){
      // check validation errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({
          status: false,
          message: 'Form validation error.',
          errors: errors.array()
        });
      }
  
      // check email exist or not
      Sign.findOne(
        { email : req.body.email },
        function(error, result){
          // check error
          if (error){
            return res.json({
              status : false,
              message : 'DB Read Fail...',
              error : error
            });
          }
  
          // result is empty or not
          if ( result ){
            // when result variable contains document
            // match password
         
            // check password is match
           if (req.body.password==result.password){
              // password matched
              return res.redirect('../../');
            } else {
              // password not matched
              return res.json({
                status : false,
                message : 'Password not matched. Login Fail...',
              });
            }
          } else {
            // user document don't exists
            return res.json({
              status : false,
              message : 'User don\'t exists.'
            });
          }
  
        }
      );
    }
  );






module.exports = router;