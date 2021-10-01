const mongoose = require("mongoose");


const commentSchema = mongoose.Schema({
    title: {
        type: String,
        Required: true
    },
    comment: {
        type: String, 
        Required: true
    },
    user : {
        type: mongoose.Types.ObjectId, 
        ref:"User"
    },
    idPuppy:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Perro"
    }],
    signupDate: {
        type: Date, select: false
    },
    lastlogin: Date,
});


module.exports = mongoose.model("comment", commentSchema)