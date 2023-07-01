const express = require('express');

const routes = express.Router();

const passport = require('passport');

const fileupload = require('../config/fileupload');

//controller

const Registercontroller = require('../controllers/RegisterController');

const controller = require('../controllers/AdminController');

const ProfileController = require('../controllers/ProfileController');

const ForgotPassController = require('../controllers/ForgotPassController');

//router

routes.get('/',controller.login);

routes.get('/register',Registercontroller.register);

routes.post('/registerData',Registercontroller.registerData);

routes.get('/dashboard',passport.checkAuthentication,controller.dashboard);

routes.get('/profile',passport.checkAuthentication,ProfileController.profile);

routes.post('/updateProfile',ProfileController.updateProfile);

routes.get('/logout',controller.logout);

routes.post('/loginData',passport.authenticate('local',{failureRedirect : '/'}),controller.loginData);

routes.get('/addblog',passport.checkAuthentication,controller.addblog);

routes.post('/insertdata',fileupload,controller.insertdata);

routes.get('/viewblog',passport.checkAuthentication,controller.viewblog);

routes.get('/DeleteBlog',controller.deletedata);

routes.get('/EditBlog',controller.editdata);

routes.get('/ForgotPass',ForgotPassController.ForgotPass);

routes.post('/forgotemail',ForgotPassController.forgotemail);

module.exports = routes;