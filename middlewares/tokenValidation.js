const jwt = require("jsonwebtoken");

let tokenValidation = (req, res, next)=>{
    let token = req.headers.token;
    if (!token){
        return res.status(400).json({
            require: false,
            message:"no token send"
        }) 
    }
    jwt.verify(token, "hola", (error, decoded) =>{
        if(error){
            return res.status(400).json({
                require: false,
                message:"not valid token"
            })
        }else{
            req.body.userId = decoded.id;
            // console.log(decoded.id)
            next();
        }
    });

}
module.exports = tokenValidation;

//esta ruta es para que nuestro servidor sea privado