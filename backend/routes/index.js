const express = require("express");
const routes = express.Router();

routes.use("/api", require("./seller-routes/User_route"));
// ok
routes.use('/', require('./buyer_router/product_router'))

routes.use('/admin',require('./admin-routes/admin'))

module.exports = routes;