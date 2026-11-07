let express = require('express');

let todocontroller = require('./controller/mycontroller');

let app = express();

app.set('view engine','ejs');

app.use(express.static('public'));

app.use(express.urlencoded({extended:true}));

app.use(express.json());

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


const PORT = process.env.PORT || 3000;

app.listen(PORT, '0.0.0.0', function(){
    console.log(`You are listening on port ${PORT}`);
});





