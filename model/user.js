const mongoose = require('mongoose');
const { required } = require('nodemon/lib/config');

let bcrypt = require('bcrypt');

let validator = require('validator')

const userSchema = new mongoose.Schema({


name:{
type:String,
required:[true, "pliz enter your full name"],
minlength:[3,"full name must be atleast 3 chaacters"],
maxlength:[50,"full name should not exceed 50 characters"],
trim:true,
validate:{
    validator:function(value){
    return /^[a-zA-Z\s'-]+$/.test(value);
    },
    message:'Name can only contain letters hyphens space and apostrophies'
}
},

email:{
    type:String,
    required:[true,"please enter Email"],
    unique:true,
    lowercase:true,
    trim:true,
    validate:{
     validator:function(value){
        return validator.isEmail(value) && 
        value === value.toLowerCase();
     },
     meessage:'email should be written in lowercase letters only'

    }
}  
,

password:{
    type:String,
    required:true,
    minlength:[8,'Each password should have lenghth of 8 or more'],
    validate:{
        validator:function(value){
          return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/.test(value)
        },
        message:'password mustcontain lowercase uppercase special character and a number'
    }
},

role:{
    type:String,
    default:'member'
}

},{timestamps:true})

userSchema.pre('save',async function(){
    this.password = await bcrypt.hash(this.password,12);
    console.log("getting ready to save data");
})

userSchema.post('save',async function(){
console.log('user saved');
})


let user = mongoose.model('user',userSchema);


module.exports=user;




















