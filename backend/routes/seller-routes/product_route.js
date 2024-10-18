const express = require("express");
const routes = express.Router();
const productCtl = require("../../controller/seller/productCtl");
const verifyToken = require("../../utils/verifyToken");
const validation = require("../../utils/validation");

// // ok
// routes.get("/insertproduct",  productCtl.insertProductGet);
// ok
routes.post(
  "/insertproduct",verifyToken,
  validation.insertproductValidator,
  productCtl.insertProduct
);
// ok
routes.get("/fetchedata", verifyToken, productCtl.fetchedata);
// ok
routes.get("/detelproduct", verifyToken, productCtl.detelproduct);

// ok
routes.put(
  "/updateproduct/:id",
  verifyToken,
  validation.updateproductValidator,
  productCtl.updateProduct
);



module.exports = routes;
