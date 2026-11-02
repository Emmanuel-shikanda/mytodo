 const Todo = require('../model/todo');   


module.exports=function(app){
    
    //display-the-todos-from-database

app.get('/',function(req,res){

    Todo.find({})
    .then(function(data){
        console.log(data);
       res.render('home',{todos:data}) 
    })
    .catch(function(err){
        console.log('you are experiencing this'+ err.message)
    })

});

//recieve-data-form

app.post('/todo',function(req,res){

 Todo.create(req.body)
 .then(function(){
    res.redirect('/');
 })
 .catch(function(err){
    console.log('you have this error' + err.message);
 })

})

app.post('/todo/:id/delete',function(req,res){

    Todo.findByIdAndDelete(req.params.id)
    .then(function(){
        res.redirect('/');
    })
    .catch(function(err){
        console.log(`${err.message} has occured`);
    })


})






app.get('/create',function(req,res){

    res.render('creattask')

});


















app.get('/profile',function(req,res){

    res.render('profile')

});


app.get('/editprofile',function(req,res){

    res.render('editprofile')

});


app.get('/login',function(req,res){

    res.render('login')

});

app.get('/signup',function(req,res){

    res.render('signup')

});



app.get('/forgot-password',function(req,res){

    res.render('forgotpassword')

});



app.get('/verify',function(req,res){

    res.render('verify')

});



}





























