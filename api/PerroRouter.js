const express = require("express");
const { populate } = require("../models/Perro");
const PerroRouter = express.Router();
const Perro = require("../models/Perro");
const User = require("../models/User");
const bcrypt = require("bcrypt")
const salt = bcrypt.genSaltSync(10);
const jwt = require("jsonwebtoken");
const tokenValidation = require("../middlewares/tokenValidation");

//para crear nuevo perro   // Ruta 1 Crear Perro Probada y ok///
PerroRouter.post("/Create/:id",tokenValidation, async (req, res) => {
  
  let iduser = req.params.id;
  const { name, sex, race } = req.body;

  Perro.create({
    name,
    race,
    sex,
    propietario: iduser,
  }).then((Newdog) => {
    // aqui me lo devolvermelo
    User.findByIdAndUpdate(iduser, { $push: { perros: Newdog._id } }).then(
      (user) => {
        res.json({
          message: "perro added successfully",
          Newdog,
        });
      }
    );
  });
});

//para buscar todos los perros   //ruta 2 buscar todos los perros fuincionna ok////
PerroRouter.get("/perros", async (req, res) => {
  
  let perros = await Perro.find({});
  return res.json({
    success: true,
    perros,
  });
});

//ver  perro por su id  //Ruta 3 comprobada ok/////
PerroRouter.get("/perro/:id", async (req, res) => {  

  const {id} = req.params;
  try {
    let perro = await Perro.findById(id); //con esta es mas directo.

    return res.json({
      success: true,
      perro,
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      success: false,
      message: "ups there is an error !!",
    });
  }
});

//para buscar por raza  //Ruta 4 pendiente comprobado todo ok//////
PerroRouter.post("/racesearch/:id", async (req, res) => {
  const{race, sex} = req.body;
  
  try {
       
    let perros = await Perro.find({race, sex: {"$ne": sex} }) ;
      return res.json({ 
      success: true,
      message: "race Localization",
      race,
      perros,
      sex
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      message: err.message,
    });
    
  }
});

//para borarr Perro    // ruta 5 comprobada ok
PerroRouter.delete("/borrarPerro/:id", async (req, res) => {
  const {id} = req.params;
  try{
    await Perro.findByIdAndDelete(id);
    return res.json({
      success: true,
      message: "Perro borrado"
    });
  } catch (error) {
    console.log(error);
    return res.json({
      success: true,
      message: "dog deleted"
    });
  } 
  
});

module.exports = PerroRouter;
