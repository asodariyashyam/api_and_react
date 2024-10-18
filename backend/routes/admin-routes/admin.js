const express = require("express");
const routes = express.Router();
const adminCtl = require("../../controller/admin/adminCtl");
const verifyToken = require("../../utils/verifyToken")

routes.get("/admindetelproduct", verifyToken, adminCtl.admindetelproduct);

routes.get("/sellerShowseller", verifyToken, adminCtl.sellerShowseller);

routes.get("/buyerShowseller", verifyToken, adminCtl.buyerShowseller);

routes.get("/adminShowseller", verifyToken, adminCtl.adminShowseller);

routes.get("/admindeteldata",verifyToken, adminCtl.admindeteldata);

routes.get("/admin_product_total", adminCtl.admin_product_total);

module.exports = routes;
