const express = require("express");
const router = express.Router();
const controllers = require("../UserController");
const middlewares = require("../../middlewares");


router.post("/", controllers.register);
router.post("/login", controllers.login);
// router.get("/", middlewares.isAuth, controllers.index); 
// router.put("/me", middlewares.isAuth,  controllers.update); 
// router.get("/logout", middlewares.isAuth, controllers.logOut); 
// router.get("/getDoctors", middlewares.isAuth, controllers.getDoctors); 
// router.get("/getDoctors/:id", middlewares.isAuth, controllers.getDoctorById); 
// router.post("/avatar" , middlewares.isAuth, uploadAvatar.any(), controllers.avatar); 
// router.get("/specialities", middlewares.isAuth, controllers.getSpecialities); 
// router.post("/specialities", middlewares.isAuth, controllers.setSpecialities); 
// router.get('/specialities/:id', middlewares.isAuth, controllers.get);


module.exports = router;
