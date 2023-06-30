const express = require('express');

const routes = express.Router();

const passport = require('passport');

const fileupload = require('../config/fileupload');

const controller = require('../controllers/AdminController');

routes.get('/',controller.login);

routes.get('/register',controller.register);

routes.get('/dashboard',passport.checkAuthentication,controller.dashboard);

routes.get('/profile',passport.checkAuthentication,controller.profile);

routes.post('/registerData',controller.registerData);

routes.get('/logout',controller.logout);

routes.post('/loginData',passport.authenticate('local',{failureRedirect : '/'}),controller.loginData);

routes.get('/addblog',passport.checkAuthentication,controller.addblog);

routes.post('/insertdata',fileupload,controller.insertdata);

routes.get('/viewblog',passport.checkAuthentication,controller.viewblog);

routes.get('/DeleteBlog',controller.deletedata);

routes.get('/EditBlog',controller.editdata);

module.exports = routes;