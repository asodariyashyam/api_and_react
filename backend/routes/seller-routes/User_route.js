const express = require("express");
const userCtl = require("../../controller/seller/userCtl");
const verifyToken = require("../../utils/verifyToken");
const upload = require("../../utils/multer_img");
const validation = require("../../utils/validation");
const commonClass = require("../../utils/common");
const passport = require("passport");

const routes = express.Router();

// ok
routes.get("/signup",  userCtl.signup);

routes.post("/singUp", validation.signupValidator, userCtl.signUp);


// ok
routes.post(
  "/signIn",
  passport.authenticate("local"),
  validation.signinValidator,
  userCtl.signin
);

routes.post(
  "/updatePassword",
  validation.updatePasswordValidator,
  verifyToken,
  userCtl.updatePassword
);

routes.get("/signout", verifyToken, userCtl.signout);

routes.post("/profile", verifyToken, upload, userCtl.profile);
// ok
routes.use('/product', require('./product_route'))


module.exports = routes;
