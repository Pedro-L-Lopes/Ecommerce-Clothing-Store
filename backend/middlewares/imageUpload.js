const multer = require("multer");
const path = require("path");
const sharp = require("sharp");
const fs = require("fs");

const imageStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    let folder = "";

    if (req.baseUrl.includes("users")) {
      folder = "users";
    } else if (req.baseUrl.includes("products")) {
      folder = "products";
    }

    cb(null, `uploads/${folder}/`);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const imageUpload = multer({
  storage: imageStorage,
  fileFilter: (req, file, cb) => {
    if (!file.originalname.match(/\.(png|jpg)$/)) {
      return cb(new Error("Por favor, envie apenas png ou jpg!"));
    }
    cb(null, true);
  },
});

const imageUploadProducts = multer({
  storage: imageStorage,
  fileFilter: (req, file, cb) => {
    if (!file.originalname.match(/\.(png|jpg|webp)$/)) {
      return cb(new Error("Por favor, envie apenas png, jpg ou webp!"));
    }
    cb(null, true);
  },
}).array("images", 3);

// Middleware para aplicar a compressão nas imagens de produtos
const compressProductImagesMiddleware = async (req, res, next) => {
  if (req.files && req.files.length > 0) {
    try {
      const compressImagePromises = req.files.map(async (file) => {
        const imagePath = file.path;
        const compressedImagePath = `${Date.now()}_compressed.jpg`;

        await sharp(imagePath)
          .resize({ width: 800, height: 800 })
          .toFormat("jpeg")
          .jpeg({ quality: 80 })
          .toFile(path.join(path.dirname(imagePath), compressedImagePath));

        fs.unlinkSync(imagePath); // Exclui o arquivo original

        await new Promise((resolve) => {
          setTimeout(() => {
            fs.rename(
              path.join(path.dirname(imagePath), compressedImagePath),
              imagePath,
              (err) => {
                if (err) throw err;
                resolve();
              }
            );
          }, 100); // Atraso de 100 milissegundos
        });

        console.log(`Imagem ${imagePath} comprimida com sucesso!`);
      });

      await Promise.all(compressImagePromises);
      next();
    } catch (error) {
      console.error("Erro ao comprimir imagens:", error);
      res.status(500).send("Erro ao comprimir imagens");
    }
  } else {
    next();
  }
};

module.exports = {
  imageUpload,
  imageUploadProducts,
  compressProductImagesMiddleware,
};
