// const UploadRouter = require("express").Router();
// const cloudinary = require("cloudinary");
// const { Router } = require("express");
// const fs = require("fs");

// //Configuración de Cloudinary

// cloudinary.config({
//   cloud_name: process.env.CLOUD_NAME,
//   api_key: process.env.API_KEY,
//   api_secret: process.env.API_SECRET,
// });

// // Subida de imagenes con Cloudinary

// UploadRouter.post("/upload", (req, res) => {
//   try {
//     if (!req.files || Object.keys(req.files).length === 0)
//       return res.status(400).json({ msg: "No files were uploaded" });
//     let img = req.files.img;
//     if (img.size > 1024 * 1024) {
//       removeTmp(img.tempFilePath);
//       return res.status(400).json({ msg: "Size too large" });
//     }
//     if (img.mimetype !== "image/jpeg" && img.mimetype !== "image/png") {
//       removeTmp(img.tempFilePath);
//       return res.status(400).json({ msg: "File type not supported" });
//     };
//     console.log(img);
//     cloudinary.v2.uploader.upload(
//       img.tempFilePath,
//       { folder: "ImagePuppy" },
//       async (err, result) => {
//         if (err) throw err;
//         removeTmp(img.tempFilePath);
//         res.json({ public_id: result.public_id, url: result.secure_url });
//       }
//     );
//   } catch (err) {
//     return res.status(500).json({ msg: err.message });
//   }
// });


// UploadRouter.post("/delete", (req, res) => {
//   try {
//     const { public_id } = req.body;
//     if (!public_id) return res.status(400).json({ msg: "No images selected" });

//     cloudinary.v2.uploader.destroy(public_id, async (err, result) => {
//       if (err) throw err;
//       res.json({ msg: "Image deleted successfully" });
//     });
//   } catch (err) {
//     return res.status(500).json({ msg: err.message });
//   }
// });

// const removeTmp = (path) => {
//   fs.unlink(path, (err) => {
//     if (err) throw err;
//   });
// };

// module.exports = UploadRouter;