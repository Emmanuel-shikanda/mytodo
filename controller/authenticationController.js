
let validator = require('validator')

require('dotenv').config()

const user =require('../model/user');

let nodemailer = require("nodemailer");

let jwt = require('jsonwebtoken');

let bcrypt = require('bcrypt');

let crypto = require('crypto');

let transpoter = nodemailer.createTransport({
        service:'gmail',
        auth:{
            user:process.env.EMAIL_USER,
            pass:process.env.EMAIL_PASS,
        }

})



const maxage = 3*24*60*60;

let createToken = function(id){

    return  jwt.sign({id},'my-secret',{
      expiresIn:maxage
    })

}


module.exports.signup_get=function(req,res){

     res.render('signup');
}

module.exports.signup_post=async function(req,res){

let {name,email,password,confirm} = req.body

try{
    
    //check all required fields

    if(!name || !email || !password || !confirm){

    return res.status(400).render('signup',{
    
        error:'pliz fill all the blanks.'

    })

    }

   //check email format

   if(!validator.isEmail(email)){
   return res.status(400).render('signup',{
   error:'pliz enter valid email addresss'
   })

   }

   //reject- uppercase emails

   if(email !== email.toLowerCase()){
  return res.status(400).render('signup',{

    error:'email should be lowercase '

  })

   }


   //check-password-limit
   if(password.length<8){
   return res.status(400).render('signup',{
    error:"password must contain atleast 8 characters"

   })


   }

   if(password !== confirm){
  return res.status(400).render('signup',{
   error:'your passwords do not match'

   })


   }

   let existingEmail = await user.findOne({email:email})

   if(existingEmail){
    return res.status(400).render('signup',{
    error:'email used already exist'
    })

   }

   let newUser = new user({
    name:name,
    email:email,
    password:password
   })

   await newUser.save();

   const token = createToken(newUser._id);

   res.cookie('jwt',token,{
    httpOnly:true,
    maxAge:maxage * 1000
   })

  return res.redirect('/');

}
catch(err){

    if(err.message === 11000){
     return res.status(400).render('signup',{
        error:'email already exist'
     })


    }

    if(err.message === 'ValidationError'){
     
    let messages = Object.values(err.errors).map(function(error){
       
        return error.messgae;
    })
    
    return res.status(400).render('signup',{
    error: messages.join(',')
    })

}

return res.status(500).render('signup',{
error:'something went wrong please try again'
})

}
    
}
    


module.exports.login_get=function(req,res){
    res.render('login');
}

module.exports.login_post=async function(req,res){
let {email,password} = req.body;


try{

   let userLogging = await user.login(email,password);

   let token = createToken(userLogging);

   res.cookie('jwt',token,{
maxAge:maxage*1000,
httpOnly:true
   })

   return res.redirect('/');
   

}catch(err){


return  res.status(400).render('login',{
   
error:err.message


})

}

}

module.exports.logout_post = async function(req,res){

res.clearCookie('jwt');

res.redirect('/login')


}

module.exports.forgotPassword_get = function(req,res){

    res.render('forgotpassword')
}


module.exports.forgotPassword_post = async function(req,res){

let {email} = req.body;

try{

    let forgettingUser = await user.findOne({email:email});

    console.log(forgettingUser);

    if(!forgettingUser){
     return res.status(404).render('forgotpassword',{
    error:'user not found',
})
}

let resetToken = crypto.randomBytes(32).toString('hex');

let hashedToken =  crypto.createHash('sha256').update(resetToken).digest('hex')

let resetTokenExpires = Date.now() + 10 * 60 * 1000;

forgettingUser.resetToken = hashedToken;
forgettingUser.resetTokenExpires = resetTokenExpires;

await forgettingUser.save();

let resetLink = `${process.env.BASE_URL}/verify/${resetToken}`;


let mailOptions = {
    from:process.env.EMAIL_USER,
    to:forgettingUser.email,
    subject:'Password Reset',
    text:`Click this link to rest your passwor: ${resetLink}`
}

console.log('abouttosendmail')

 await transpoter.sendMail(mailOptions);

 console.log('user-saved')

res.render('forgotpassword',{
    success:"password reset link sent to your Email"
})

}
catch(err){

console.log(err.message)


}


}

module.exports.verify_get =async  function(req,res){

let token = req.params.token;

//hashed-token

let hashedToken=crypto.createHash('sha256').update(token).digest('hex');

let foundUser = await user.findOne({resetToken:hashedToken});

if(!foundUser){
return res.render('forgotpassword',{

error:'invalid or expired reset link please request another one.'

})
}

if(foundUser.resetTokenExpires<Date.now()){

    return res.render('forgotpassword',{
   error:'your reset link has  expired please request another one'

    })



}

    res.render('verify',{token:token});

}

module.exports.verify_post =async function(req,res){

    let {password,confirmpassword,token} = req.body;

    console.log("password "+password)
    console.log("confirm-password "+confirmpassword)

    if(password!== confirmpassword){
    return res.render('verify',{
        token:token,
        error:"passwords do not match"
    })

    }

    let hashedToken=crypto.createHash('sha256').update(token).digest('hex');

    let foundUser = await user.findOne({
        resetToken:hashedToken
    })
    

    if(!foundUser){
    return res.render('forgotpassword',{

       error:'invalid reset link. pliz request another one'
    })

    }

    if(foundUser.resetTokenExpires<Date.now()){
    return res.render('forgotpassword',{
        error:'your reset link has expired',
    })

    }

    foundUser.password=password;

//reset-token

    foundUser.resetToken=undefined;
    foundUser.resetTokenExpires=undefined;

    await foundUser.save()


 return res.redirect('/login')
}















