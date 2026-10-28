
module.exports=function(app){
    
app.get('/todo',function(req,res){

    res.render('home')

});

app.get('/create',function(req,res){

    res.render('creattask')

});


app.get('/profile',function(req,res){

    res.render('profile')

});












}





























