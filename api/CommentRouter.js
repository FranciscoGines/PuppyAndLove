const express = require("express");
const commentRouter = express.Router();
const Comment = require("../models/Comment");
const jwt = require("jsonwebtoken");
const tokenValidation = require("../middlewares/tokenValidation");
const User = require("../models/User");
// const PerroSchema = require("../models/Perro");
//test
//para crear nuevo comentario
commentRouter.post("/newComment/:userId/:idPuppy", tokenValidation, async (req, res) => {     //RUTA 1 CREADA Y COMPROBADA EN POSTMAN
  const { title, comment } = req.body;
  const { userId, idPuppy } = req.params;

  try {
    if (!title || !comment) {
      return res.status(400).json({
        success: false, message: " Fill the required information.",
      })
    };
    let comentario = new Comment({
      title, comment,
      user: userId,
      idPuppy,
    });
    console.log(idPuppy)
    let newcomment = await comentario.save();

    return res.status(201).json({
      success: true,
      newcomment, message: "new comment Create",
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }
});

//contestar comentario 
commentRouter.post("/respuestComment/:idComment",tokenValidation, async (req, res) => {     //RUTA 1 CREADA Y COMPROBADA EN POSTMAN
  const { title, comment } = req.body;
  const { idComment,idPuppy} = req.params;

  try {
    if (!title || !comment) {
      return res.status(400).json({
        success: false, message: " Fill the required information.",
      })
    };
    let comentario = new Comment({
      title, comment,
      idComment,idPuppy,

    });
    console.log(idPuppy)
    await comentario.save();
    // const RespComment = await comentario.findById(idComment).populate("propietario");
    // console.log(RespComment);
    return res.status(201).json({
      success: true,
      comentario, message: "new comment Create",
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }
});

// //para q me muestre todos los comentarios
commentRouter.get("/comentarios", async (req, res) => {

  let comments = await Comment.find({})
  return res.json({
    success: true,
    comments,
  });

});

// // //buscar un comentario 
commentRouter.get("/comment/:id", tokenValidation, async (req, res) => {   //  ruta 3 comprobado en postman y ok

  try {
    const { id } = req.params;
    let CommentById = await Comment.findById(id).populate('user name');
    // const token = jwt.sign({ id: user._id }, "hola", { expiresIn:3600 })
    return res.json({
      success: true,
      CommentById,
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }
});


module.exports = commentRouter;
