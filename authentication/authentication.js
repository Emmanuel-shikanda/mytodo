let {Router}=require('express');

let auth = Router();

let authcontroller=require('../controller/authenticationController');


auth.get('/Signup',authcontroller.signup_get);

auth.post('/Signup',authcontroller.signup_post);

auth.get('/login',authcontroller.login_get);

auth.post('/login',authcontroller.login_post);

auth.post('/logout',authcontroller.logout_post);

auth.get('/forgotpassword',authcontroller.forgotPassword_get);

auth.post('/forgotpassword',authcontroller.forgotPassword_post);

auth.get('/verify/:token',authcontroller.verify_get);

auth.post('/verify',authcontroller.verify_post);





module.exports=auth;
































