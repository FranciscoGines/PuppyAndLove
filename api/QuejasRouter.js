// const express = require("express");
// const quejas = require("../models/Quejas");
// const tokenValidation = require("../middlewares/tokenValidation");
// const jwt = require("jsonwebtoken");


// //Para ver las quejas de los usuarios por Id
// QuejasRouter.get("/reclamacion/user/:id", tokenValidation, async (req, res) => {
//   const {id} = req.params
//     let quejas  = await Quejas.find({UserId});
//     return res.json({
//       success: true,
//       quejas,
//     });
//   });

//   module.exports = QuejasRouter;