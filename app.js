let express = require('express');

let todocontroller = require('./controller/mycontroller');

let cookieParser = require('cookie-parser');


let app = express();

let auth =require('./authentication/authentication');


app.set('view engine','ejs');

app.use(express.static('public'));

app.use(express.urlencoded({extended:true}));

app.use(express.json());

app.use(cookieParser())

const dns = require('node:dns');

dns.setServers(['8.8.8.8', '8.8.4.4']);


require('dotenv').config();

const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI)
.then(function(){
console.log('MongoDB connected');
})
.catch(function(err) {
    console.log("MongoDB not connected we are experiencing " + err.message)
})


todocontroller(app);

app.use(auth);


app.get('/create-cookie',function(req,res){

    res.cookie('newUser',true,{
    httpOnly:true
    });

    res.cookie('ismember',false,{
      maxAge:86400000,
      secure:true ,
      httpOnly:true
     

    });

    res.send('cookie-created')

})

app.get('/read-cookie',function(req,res){

    let cookies = req.cookies;
    console.log(cookies.newUser)

    res.json(cookies)


})








const PORT = process.env.PORT || 3000;

app.listen(PORT, '0.0.0.0', function(){
    console.log(`You are listening on port ${PORT}`);
});





