 const Todo = require('../model/todo'); 
 
 let user = require('../model/user');

 let {protectRoute,checkUser} = require('../middleware/auth');

module.exports=function(app){
    
    //display-the-todos-from-database

app.get('/',protectRoute,async function(req,res){

   try{


    let data = await Todo.find({
        owner:req.userId
    })


    res.render('home',{
        todos:data,
    })

   }
   catch(err){

console.log('some-thing-is-not-right')

   }

});

//recieve-data-form

app.post('/todo',protectRoute,function(req,res){

 Todo.create({...req.body,
    owner:req.userId})

 .then(function(){
    res.redirect('/');
 })
 .catch(function(err){
    console.log('you have this error' + err.message);
 })

});

app.post('/todo/:id/delete',protectRoute,function(req,res){

    Todo.findByIdAndDelete(req.params.id)
    .then(function(){
        console.log(req.params.id);
        res.redirect('/');
    })
    .catch(function(err){
        console.log(`${err.message} has occured`);
    })

});

app.post('/todo/:id/complete',protectRoute,function(req,res){

Todo.findByIdAndUpdate(
    req.params.id,
    { completed: req.body.completed },
)
.then(function(){
res.sendStatus(200)
})
.catch(function(err){
console.log(err.message);
})


});




app.get('/create',protectRoute,function(req,res){

    res.render('creattask')

});




app.get('/profile',protectRoute,function(req,res){

    res.render('profile')

});


app.get('/editprofile',protectRoute,function(req,res){

    res.render('editprofile')

});




app.get('/signup',function(req,res){

    res.render('signup')

});





}





























