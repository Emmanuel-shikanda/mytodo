let {Router}=require('express');

let auth = Router();

let authcontroller=require('../controller/authenticationController');

auth.get('/Signup',authcontroller.signup_get);

auth.post('/Signup',authcontroller.signup_post);

auth.get('/login',authcontroller.login_get);

auth.post('/login',authcontroller.login_post)




module.exports=auth;
































