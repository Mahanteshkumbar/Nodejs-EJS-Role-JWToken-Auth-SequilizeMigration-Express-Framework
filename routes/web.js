const express = require('express');
const { check, body } = require('express-validator');
const db = require('../models');

//Middlewares
const isAuth = require('../app/Http/Middleware/authMiddleware');
const isLoggedIn = require('../app/Http/Middleware/isUserLoggedIn');
const role = require('../app/Http/Middleware/validateRoleMiddleware');

//Controllers
const homeController = require('../app/Http/Controllers/HomeController');
const loginController = require('../app/Http/Controllers/Auth/LoginController');
const registerController = require('../app/Http/Controllers/Auth/RegisterController');
const userController = require('../app/Http/Controllers/Admin/Users/UserController');
const roleController = require('../app/Http/Controllers/Admin/Roles/RoleController');



const route = express.Router();

//Auth routes
route.get('/login', isLoggedIn, loginController.index);

route.post('/login', 
 body('email')
.not()
.isEmpty()
.withMessage('Email is required!')
.bail()
.isEmail()
.withMessage('Enter Valid Email!')
.bail(),
 body('password')
.not()
.isEmpty()
.withMessage('Password is required!')
.bail() , isLoggedIn, loginController.login);

route.post('/logout', loginController.logout);
route.get('/register', isLoggedIn,registerController.index);

route.post('/register',
        body('name')
        .not()
        .isEmpty()
        .withMessage('Name is required!')
        .bail()
        .isLength({min: 5})
        .withMessage('Name must 5 charcters long!')
        .bail(),
        body('email')
        .not()
        .isEmpty()
        .withMessage('Email is required!')
        .bail()
        .isEmail()
        .withMessage('Enter Valid Email!')
        .bail()
        .custom(value => {
            return db.User.findOne({ where : {email:value}}).then(user => {
                if (user) {
                    return Promise.reject('E-mail already in use');
                }   
            });
        })
        .bail(),
        body('password')
        .not()
        .isEmpty()
        .withMessage('Password is required!')
        .bail() 
        .isLength({min: 5})
        .withMessage('Password is minimum 5 charcters long!')
        .bail()    
    ,registerController.register);


//Auth Routes
route.get('/home', isAuth ,homeController.home);

//Admin Routes

//Roles
route.get('/role/create',isAuth ,roleController.create);
route.post('/role/update/:id',isAuth,roleController.update);
route.get('/role/edit/:id',isAuth,roleController.edit);
route.post('/role/delete/:id',isAuth,roleController.delete);
route.post('/role/store',isAuth ,roleController.store);
route.get('/roles',isAuth, roleController.index);

//Users
route.get('/user/create',isAuth ,userController.create);
route.post('/user/update/:id',isAuth,userController.update);
route.get('/user/edit/:id',isAuth,userController.edit);
route.post('/user/delete/:id',isAuth,userController.delete);
route.post('/user/store',
body('name')
.not()
.isEmpty()
.withMessage('Name is required!')
.bail()
.isLength({min: 5})
.withMessage('Name must 5 charcters long!')
.bail(),
body('email')
.not()
.isEmpty()
.withMessage('Email is required!')
.bail()
.isEmail()
.withMessage('Enter Valid Email!')
.bail()
.custom(value => {
    return db.User.findOne({ where : {email:value}}).then(user => {
        if (user) {
            return Promise.reject('E-mail already in use');
        }   
    });
})
.bail(),
body('password')
.not()
.isEmpty()
.withMessage('Password is required!')
.bail() 
.isLength({min: 5})
.withMessage('Password is minimum 5 charcters long!')
.bail()    
,isAuth, role.validateRole("admin") ,userController.store);
route.get('/users', isAuth, role.validateRole("admin"), userController.index);


//User Routes

//Home Page routes
route.get('/',homeController.welcome);


module.exports = route;