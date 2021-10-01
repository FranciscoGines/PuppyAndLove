const mongoose = require("mongoose");
const Schema = mongoose.Schema; 
// const bcrypt= require("bcrypt-nodejs");


const UserSchema = mongoose.Schema({
    name: {type: String,required: true, unique: true}, 
    surname: { type: String,required: true},
    birth_date: { type: String,required: true},
    direction: {type: String,required: true},
    email: {type: String,required: true, unique: true,},
    // avatar: {type: String,required: true},
    // cloudinary_id:{type: String,required: true},
    password: {type: String,required: true}, 
    perros: [{ type: Schema.Types.ObjectId, ref: "Perro" }],
    // sex: {type: String,required: true},
    date: {type: Date, default: Date.now},
    // signupDate: {type: Date, select: false},
    // lastlogin: Date,
});


module.exports = mongoose.model("User", UserSchema); 