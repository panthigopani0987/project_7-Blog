const express = require('express');

const port = 9000;

const app = express();

const path = require('path');

app.use('/uploads',express.static(path.join(__dirname,('uploads'))));

app.use(express.static(path.join(__dirname,'public')));

const DB = require('./config/mongoose');

const passport = require('passport');

const session = require('express-session');

const passportLocal = require('./config/passport-local');

const cookie = require('cookie-parser');

app.use(session({
    secret : 'Blog_project',
    resave : true,
    saveUninitialized : true,
    cookie : {
        maxAge : 1000*60*60
    }
}));

app.use(express.urlencoded());

app.use(passport.initialize());

app.use(passport.session());

app.use(passport.setAuthentication);

app.use(cookie());

app.use('/',require('./routes'));

app.set('view engine','ejs');

app.listen(port,(err)=>{
    if(err){
        console.log(err);
        return false;
    }
    console.log("Server Is Start On Port :- "+port);
})