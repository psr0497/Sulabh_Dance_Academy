
require('dotenv').config();


const express = require("express");

const app = express();

const morgan = require('morgan');


const path = require('path');

const cors = require('cors');

const port = process.env.PORT;

const database = require('./connect');

const userController = require('./controllers/userController');


const signupController = require('./controllers/signupController');






//Express Specific Stuff
app.use('/static',express.static('static'))
app.use(express.urlencoded())


app.use(morgan('dev'));

app.use(cors());

app.use('/api/user', userController);

app.use('/api/sign', signupController);




//Pug Specific Stuff
app.set('view engine','pug')

app.set('views',path.join(__dirname,'template')) //set the views directory

//Endpoints


app.get('/',(req, res)=>{
    const params={}
    res.status(200).render('home.pug',params);

})

app.get('/contact',(req, res)=>{
    const params={}
    res.status(200).render('contact.pug',params);

})

app.get('/about',(req, res)=>{
    const params={}
    res.status(200).render('about.pug',params);

})


app.get('/classInfo',(req, res)=>{
    const params={}
    res.status(200).render('classInfo.pug',params);

})


app.get('/service',(req, res)=>{
    const params={}
    res.status(200).render('service.pug',params);

})



//Start the Server
app.listen(port,()=>{
    console.log ("the app is running on " + port);
});

