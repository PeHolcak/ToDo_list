const mongoose = require("mongoose")
const bcrypt = require('bcryptjs')
const UserSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    date:{
        type: String,
        default: Date.now
    },
    lastOpenedTask:{
        type: String,
        default: null
    }
})

var User = mongoose.model('User', UserSchema);
User.addUser = function(user, callback){
    bcrypt.genSalt(10, (err, salt)=>{
        if(err){
            callback('Chyba serveru');
        }else {
            bcrypt.hash(user.password, salt, (err, hash)=>{
                if(err){
                    callback('Chyba serveru');
                }else{
                    user.password = hash;
                    user.save((err, result)=>{
                        if(err){
                            callback('Nepodařilo se přidat uživatele', null);
                        } else{
                            callback(null, 'user added');
                        }
                    });
                } 
            });
        }
    });    
};

module.exports = User 