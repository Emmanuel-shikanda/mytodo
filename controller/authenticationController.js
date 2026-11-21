
let validator = require('validator')

const user =require('../model/user');



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
   res.status(400).render('signup',{
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

  return res.redirect('/login');

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
error:'something went wrong '
})

    }
    

    



}
    


module.exports.login_get=function(req,res){
    res.render('login');

}

module.exports.login_post=async function(req,res){
let {email,password} = req.body;

try{
let userLogin = await user.findOne({email})
console.log(userLogin)
}catch(err){
handleError(err);
res.status(500).send(err.message);
}

}




