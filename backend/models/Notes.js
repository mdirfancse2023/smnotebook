const mongoose = require('mongoose');
const noteSchema = new Schema({
    title : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    tag : {
        type : String,
        default : "General"
    },
    timestamp : {
        type : Date,
        default : Date.now
    }  
});
module.exports = mongoose.model('note',noteSchema);