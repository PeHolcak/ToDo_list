const mongoose = require('mongoose');
let taskmodel = new mongoose.Schema({

    idOfUSer: {
        type: String,
        required: true},
    title: {
        type: String,
        required: true
    },    
    description: {
        type: String,
        required: false
    },
    done:{
        type: Boolean,
        required: true
    }

},{ timestamps: true });
var task = mongoose.model('task', taskmodel);
module.exports = task