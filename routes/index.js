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

const ProductController = require('../controllers/ProductController');

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

routes.post('/postSubcategory',SubCategoryController.postSubcategory);

routes.get('/updateSubCate',SubCategoryController.updateSubCate);

routes.post('/postupdateSubcategory',SubCategoryController.postupdateSubcategory);

//extra sub category

routes.get('/ExSubCategory',passport.checkAuthentication,ExSubCategoryController.ExSubCategory);

routes.post('/postExSubcategory',ExSubCategoryController.postExSubcategory);

routes.get('/updateExSubCate',ExSubCategoryController.updateExSubCate);

routes.post('/postExSubcateUpdate',ExSubCategoryController.postExSubcateUpdate);

//product

routes.get('/product',passport.checkAuthentication,ProductController.product);

routes.post('/productdata',fileupload,ProductController.productdata);

routes.get('/viewProduct',passport.checkAuthentication,ProductController.viewProduct);

routes.get('/deleteProduct',ProductController.deleteProduct);

routes.get('/updateProduct',ProductController.updateProduct);

module.exports = routes;