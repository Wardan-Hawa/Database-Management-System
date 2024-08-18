const multer = require('multer');
const responses = require("./helper/responses");
const authService = require("./authServices");

const isAuth = (req, res, next) => {
  try {
    const token =
      req?.cookies?.token ||
      req?.headers?.authorization?.split(" ")[1] ||
      req?.headers?.Authorization?.split(" ")[1] ||
      null;
    if (!token) return responses.unauthorized(res);
    const decode = authService.decodeToken(token);
    if (!decode) return responses.unauthorized(res);
    req.user = {
      ...decode,
      token
    };
    return next();
  } catch (err) {
    console.log("ERROR meddleware fun -->", err)
    return responses.unauthorized(res);
  }
};

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      // Define the destination folder where files will be stored
      cb(null, 'uploads/'); // This will create an "uploads" directory in your project folder
    },
    filename: (req, file, cb) => {
      // Define the filename for the uploaded file
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, file.fieldname + '-' + uniqueSuffix + '-' + file.originalname);
    },
  });

  const upload = multer({ storage});

  module.exports = {upload,
    isAuth};




  
 