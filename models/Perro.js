const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PerroSchema = Schema({
    name: {type: String,required: true}, 
    sex: {type: String,required: true},
    race: {type: String,required: true},
    propietario: {type: Schema.Types.ObjectId, ref: "User" },

});    

module.exports = mongoose.model("Perro", PerroSchema);  
