const db = require("../../config/db");
const commonClass = require("../../utils/common");

module.exports.admindetelproduct = (req, res) => {
  const productId = req.query.id;
  const deleteSql = "DELETE FROM product WHERE id = ?";

  db.query(deleteSql, [productId], function (error, result) {
    if (error) {
      console.error(error);
      return commonClass.reply(res, 500, true, "Database error");
    }
    return commonClass.reply(res, 200, false, "Product deleted successfully");

    // return res.redirect("back");
  });
};

module.exports.sellerShowseller = (req, res) => {
  const rolename = "seller";

  const sql = "SELECT * FROM user WHERE role = ?";

  db.query(sql, [rolename], (error, results) => {
    if (error) {
      console.error(error);
      return res.status(500).json({ error: "Database error" });
    }

    if (results.length === 0) {
      return res
        .status(404)
        .json({ message: "Seller not found or not a seller" });
    }

    const data = results;
    return commonClass.reply(res, 200, false, " seller found", data);
    // res.render("admin/sellerShowseller", { data:results });
  });
};

module.exports.buyerShowseller = (req, res) => {
  const rolename = "buyer";

  const sql = "SELECT * FROM user WHERE role = ?";

  db.query(sql, [rolename], (error, results) => {
    if (error) {
      console.error(error);
      return res.status(500).json({ error: "Database error" });
    }

    if (results.length === 0) {
      return res
        .status(404)
        .json({ message: "Seller not found or not a seller" });
    }
    const data = results;

    return commonClass.reply(res, 200, false, "Buyer found", data);
    // res.render("admin/buyerShowseller", { data:results });
  });
};

module.exports.adminShowseller = (req, res) => {
  const rolename = "admin";

  const sql = "SELECT * FROM user WHERE role = ?";

  db.query(sql, [rolename], (error, results) => {
    if (error) {
      console.error(error);
      return res.status(500).json({ error: "Database error" });
    }

    if (results.length === 0) {
      return res
        .status(404)
        .json({ message: "Seller not found or not a seller" });
    }
    const data = results;

    return commonClass.reply(res, 200, false, " Seller found", data);

    // res.render("admin/adminShowseller", { data:results });
  });
};

module.exports.admindeteldata = (req, res) => {
  const productId = req.query.id;
  const deleteSql = "DELETE FROM user WHERE id = ?";

  db.query(deleteSql, [productId], function (error, result) {
    if (error) {
      console.error(error);
      return commonClass.reply(res, 500, true, "Database error");
    }
    return commonClass.reply(res, 200, false, "Delete data successfully!! ");
    // return res.redirect("back");
  });
};

module.exports.admin_product_total = (req, res) => {
  const sql = `
      SELECT
        c.id AS id,
        u.id AS userId,
        u.email,
        u.role,
        c.quantity As  quantity,
        p.id AS productId, 
        p.product_name, 
        p.price, 
        p.stock, 
        p.description 
        FROM 
        cart c 
        JOIN 
          user u ON c.userId = u.id
        JOIN 
          product p ON c.productId = p.id 
    `;

  db.query(sql, function (error, results) {
    if (error) {
      console.error(error);
      return commonClass.reply(res, 500, true, "Database error");
    }
    return commonClass.reply(
      res,
      200,
      false,
      "Product get successfully",
      results
    );
  });
};
