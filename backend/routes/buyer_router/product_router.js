const express = require("express");
const routes = express.Router();
const buyer_productCtl = require("../../controller/buyer/buyer_productCtl");
const verifyToken = require("../../utils/verifyToken")

// ok
routes.get("/", buyer_productCtl.getallproduct);
// ok
routes.get("/addproduct", buyer_productCtl.addproduct);
// ok
routes.post("/quantitydata",verifyToken, buyer_productCtl.quantitydata);
// ok
routes.get('/buyer_product',verifyToken,buyer_productCtl.buyer_product)
// ok
routes.get("/removecart", verifyToken,buyer_productCtl.removecart)


module.exports = routes;
