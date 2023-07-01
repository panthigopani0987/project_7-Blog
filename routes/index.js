const express = require('express');

const routes = express.Router();

const passport = require('passport');

const fileupload = require('../config/fileupload');

const Registercontroller = require('../controllers/RegisterController');

const controller = require('../controllers/AdminController');

routes.get('/',controller.login);

routes.get('/register',Registercontroller.register);

routes.post('/registerData',Registercontroller.registerData);

routes.get('/dashboard',passport.checkAuthentication,controller.dashboard);

routes.get('/profile',passport.checkAuthentication,controller.profile);

routes.post('/updateProfile',controller.updateProfile);

routes.get('/logout',controller.logout);

routes.post('/loginData',passport.authenticate('local',{failureRedirect : '/'}),controller.loginData);

routes.get('/addblog',passport.checkAuthentication,controller.addblog);

routes.post('/insertdata',fileupload,controller.insertdata);

routes.get('/viewblog',passport.checkAuthentication,controller.viewblog);

routes.get('/DeleteBlog',controller.deletedata);

routes.get('/EditBlog',controller.editdata);

module.exports = routes;