const express = require("express");
const UserRouter = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt")

const jwt = require("jsonwebtoken");

const salt = bcrypt.genSaltSync(10);
const tokenValidation = require("../middlewares/tokenValidation");


//para Resgistro a un usuario  ok///////
UserRouter.post("/Registration", async (req, res) => {
  const { name, surname, birth_date, direction, email, password } = req.body; //ruta 1 Registro comprobado postman ok
  console.log(email)
  const hashPass = bcrypt.hashSync(password, salt);
  let user = new User({
    name,
    surname,
    birth_date,
    direction,
    email,
    password: hashPass
  });
  
  let userRegistrado = await user.save();
  const token = jwt.sign({ id: user._id }, "hola", { expiresIn:"15d" })
  if(userRegistrado == false){
    return res.json({
      succes: false,
      message:"user already registered"
    })
  }else{
    res.json({ success: true, 
     message:"welcome!!"
    })
  }

});


// para hacer login ( logearse)                                //ruta 2  para hacer login comprobada ok//////
UserRouter.post("/login", async (req, res) => {
  // console.log(req.body.email)
  // console.log(req.body.password)

  try {
    const { email, password } = req.body;
    if (email == null || password == null) {
      return res.json({
        success: true,
        message: "check if all the elements are well written", //comprobar si todos los elementos estan bien
      });
    }
    if (email.length <= 1) {
      return res.json({
        success: true,
        message: "enter the email here", //pon aqui tu email
      });
    }
    let user = await User.findOne({email});
    // console.log(user)
    let hashPass = user.password
    // console.log(hashPass)
    let passwordIsValid = await bcrypt.compare(password, hashPass);
    // console.log(passwordIsValid)
    const token = jwt.sign({ id: user._id }, "hola", { expiresIn: "15d"})
    if(passwordIsValid == false){
      res.json({
        success: false,
        message:"La contraseña es valida"
      })
    }else{
      res.json({
        success: true,
        token,
        message:"Bienvenido de Nuevo"
      })
    }
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }
});
// para buscar todos los usuarios                //ruta 3 para buscar todos los usuarios comprobado y ok///
UserRouter.get("/users", async (req, res) => {
  
  let user = await User.find({});
  return res.json({
    success: true,
    user,
  });
});

//ver usuario / userhome                                 //Ruta 4 buscar usuarios con comprobado y ok///
UserRouter.get("/user/:id", tokenValidation, async (req, res) => {
  
  const { id } = req.params;
  const token = jwt.sign({ id: User._id }, "hola", { expiresIn:"15d" })
  try {
    let user = await User.findById(id).populate("perros"); //con esta es mas directo.
    
    return res.json({
      success: true,
      user,
      token,
      message: "welcome"
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }
});


//actualizar perfil usuario
UserRouter.put("/actualizar/user/:id",tokenValidation, async (req, res) =>{     //RUTA 6 actualizar user COMPROBADA OK
  const{email,password} = req.body;
  const hashPass = bcrypt.hashSync(password, salt);
  const {id} = req.params;
  try{
    await User.updateOne({_id:req.params.id},{email,password: hashPass});
    console.log(email,password);
    // 
    
    return res.status(205).json({
      success: true,
      message: "User update"
    });
  }catch (err) {
    return res.status(400).json({success: false, message:"user not updated"});
    
  }
})


//para cambiar  contraseña usuario
UserRouter.put("/change/password/:id",tokenValidation, async (req, res) => {        //ruta 7 actualizar contraseña usuario COMPROBADA OK
  const {id} = req.params
  const {password} = req.body
  const hashPass = bcrypt.hashSync(password, salt);
   let changepassword = await User.findByIdAndUpdate(id, {password})

    return res.json({
    success: true,
    message: "changed password"
  })
  
});
//para borarr Usuario                                      //ruta 5 borarr Usuario comprobada y ok///
UserRouter.delete("/deleteuser/:id",tokenValidation, async (req, res) => {

  try {
    
    let borrarusuario = await User.findByIdAndDelete(idUser)
    console.log(borrarusuario)
    await User.findByIdAndUpdate(userId, { $pull: { perros: perrosId },});
    await User.findByIdAndDelete(req.params.id);
    return res.json({
      success: true,
      message: "usuario borrado",
    });
  } catch (error) {
    console.log(error);
  }
});


module.exports = UserRouter; // exportar el router y l lo importamos al server.js

// 
