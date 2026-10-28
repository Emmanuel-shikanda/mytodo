
module.exports=function(app){
    
app.get('/',function(req,res){

    res.render('home')

});

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





























