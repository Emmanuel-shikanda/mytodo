

let User = require('../model/user')

let jwt = require('jsonwebtoken');

//

function protectRoute(req,res,next){

let token = req.cookies.jwt;

if(!token){

return res.redirect('/login');

}

jwt.verify(token,"my-secret",function(err,decodeToken){

if(err){

return res.redirect('/login')

}

req.userId = decodeToken.id

next();


})


}



function checkUser(req,res,next){

let token = req.cookies.jwt;

if(token){

jwt.verify(token,'my-secret', async function(err,decodeToken){

if(err){
console.log(err.message)
res.locals.user = null
next()
}
else{

    let user = await User.findById(decodeToken.id);

    res.locals.user=user;

    next()


}



})

}
else{

    res.locals.user = null;
    next();

}


}









module.exports={protectRoute,checkUser}


















