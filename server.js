require("dotenv").config();
const express = require("express");
const app = express();

const path = require('path');

const fileUpload = require("express-fileupload");
const cloudinary = require("cloudinary");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const salt = bcrypt.genSaltSync(10)

const UserRouter = require("./api/UserRouter");
const PerroRouter = require("./api/PerroRouter");
const commentRouter = require("./api/CommentRouter");
const { Server } = require("tls");
// const quejasRouter = require("./api/QuejasRouter")
// const UploadRouter = require("./api/UploadRouter");
                 

const { DB_URI } = process.env;


const PORT = process.env.PORT || 5000;

 //aqui empieza la conexion a la base de datos desde aqui
mongoose.connect(DB_URI, {useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true,})
.then(() => { console.log("Base de Datos Conectada..!"); }) //para q nso arroge base datos conectada
.catch((err) => {console.log(err); }); //para q nos aparezca un error en la consola

//middlewares
app.use(express.json()); //este se encarga de leer los datos que estamos guardando   
app.use(express.urlencoded({ extended: true }));//para poder enviar desde porstamn body/urlencoded 
// app.use(fileUpload({useTempFiles: true,}));


app.use(cors());
app.get("/", (req,res)=>{
    res.json("este es el contenido a devolver")
})

// cuando vayas a hacer una llamada 'user' me coges UserRouter.
app.use("/user", UserRouter);
app.use("/perro", PerroRouter);
app.use("/comment", commentRouter);
// app.use("/upload", UploadRouter);
// app.use("/quejas", quejasRouter);




app.use(express.json());

// app.use('/api',require('/routes/Upload'));





//start the server
app.listen(PORT, () => {
console.log(`Server running on port ${PORT}`);
});
