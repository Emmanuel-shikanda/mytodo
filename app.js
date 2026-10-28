let express = require('express');

let todocontroller = require('./controller/mycontroller');

let app = express();

app.set('view engine','ejs');

app.use(express.static('public'));

app.use(express.urlencoded({extended:true}));


todocontroller(app);






app.listen(3000,function(){
    console.log('you are listening to port 3000' );
});






