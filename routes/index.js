const express = require('express');

const routes = express.Router();

const passport = require('passport');

const fileupload = require('../config/fileupload');

//controller

const Registercontroller = require('../controllers/RegisterController');

const controller = require('../controllers/AdminController');

const ProfileController = require('../controllers/ProfileController');

const ForgotPassController = require('../controllers/ForgotPassController');

const CategoryController = require('../controllers/CategoryController');

const SubCategoryController = require('../controllers/SubCategoryController');

const ExSubCategoryController = require('../controllers/ExtraSubCategoryController');

//router

//register

routes.get('/register',Registercontroller.register);

routes.post('/registerData',Registercontroller.registerData);

//dashboard

routes.get('/dashboard',passport.checkAuthentication,controller.dashboard);

//profile

routes.get('/profile',passport.checkAuthentication,ProfileController.profile);

routes.post('/updateProfile',ProfileController.updateProfile);

//login

routes.get('/',controller.login);

routes.get('/logout',controller.logout);

routes.post('/loginData',passport.authenticate('local',{failureRedirect : '/'}),controller.loginData);

//blog

routes.get('/addblog',passport.checkAuthentication,controller.addblog);

routes.post('/insertdata',fileupload,controller.insertdata);

routes.get('/viewblog',passport.checkAuthentication,controller.viewblog);

routes.get('/DeleteBlog',controller.deletedata);

routes.get('/EditBlog',controller.editdata);

//forgot password

routes.get('/ForgotPass',ForgotPassController.ForgotPass);

routes.post('/forgotemail',ForgotPassController.forgotemail);

routes.get('/OTP',ForgotPassController.OTP);

routes.post('/sendOTP',ForgotPassController.sendOTP);

routes.get('/newPass',ForgotPassController.newPass);

routes.post('/newPassPost',ForgotPassController.newPassPost);

//category

routes.get('/addCategory',passport.checkAuthentication,CategoryController.category);

routes.post('/category_add',passport.checkAuthentication,CategoryController.category_add);

routes.get('/deleteCate',CategoryController.deleteCate);

routes.get('/updateCate',CategoryController.updateCate);

//sub category

routes.get('/add_SubCategory',passport.checkAuthentication,SubCategoryController.add_SubCategory);

routes.post('/postSubcategory',passport.checkAuthentication,SubCategoryController.postSubcategory);

routes.get('/updateSubCate',passport.checkAuthentication,SubCategoryController.updateSubCate);

routes.post('/postupdateSubcategory',passport.checkAuthentication,SubCategoryController.postupdateSubcategory);

//extra sub category

routes.get('/ExSubCategory',passport.checkAuthentication,ExSubCategoryController.ExSubCategory);

routes.post('/postExSubcategory',passport.checkAuthentication,ExSubCategoryController.postExSubcategory);

routes.get('/updateExSubCate',passport.checkAuthentication,ExSubCategoryController.updateExSubCate);

routes.post('/postExSubcateUpdate',passport.checkAuthentication,ExSubCategoryController.postExSubcateUpdate);

module.exports = routes;