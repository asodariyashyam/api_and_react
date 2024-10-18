const { render } = require("ejs");
const db = require("../../config/db");
const commonClass = require("../../utils/common");

const path = require("path");

module.exports.insertProductGet = (req, res) => {
  res.render("product/add_product");
};

module.exports.insertProduct = (req, res) => {
  try {
      const { product_name, price, old_price, description, stock } = req.body; 
      const userId = req.user.id; 
      

      
      const sql =
        "INSERT INTO product (product_name, price, old_price, description, userId, stock) VALUES (?, ?, ?, ?, ?, ?)";

      db.query(
        sql,
        [product_name, price, old_price, description, userId, stock],
        function (error, result) {
          if (error) {
            console.error("Database error:", error);
            return commonClass.reply(res, 500, true, "Database error");
          }
          const data = {
            id: result.insertId,
            product_name,
            price,
            old_price,
            description,
            stock,
          };

          return commonClass.reply(
            res,
            200,
            false,
            "Product added successfully!",
            data
          );
        }
      );
   
  } catch (error) {
    console.error("Internal server error:", error);
    return commonClass.reply(res, 500, true, "Internal server error");
  }
};


module.exports.fetchedata = (req, res) => {
  try {
    const sql = "SELECT * FROM product WHERE userId = ?";

    db.query(sql, [req.user.id], function (error, results) {
      if (error) {
        console.error(error);
        return commonClass.reply(res, 500, true, "Database error");
      }

      // return res.render("seller/getSeller", {
      //   results,
      // });

      return commonClass.reply(
        res,
        200,
        false,
        "Products fetched successfully!",
        results
      );
    });
  } catch (error) {
    console.error("Internal server error: ", error);
    return commonClass.reply(res, 500, true, "Internal server error");
  }
};

module.exports.detelproduct = (req, res) => {
  try {
    const productId = req.query.id;

    const selectSql = "SELECT * FROM product WHERE id = ?";

    db.query(selectSql, [productId], function (error, results) {
      if (error) {
        console.error(error);
        return commonClass.reply(res, 500, true, "Database error");
      }

      if (results.length === 0) {
        return commonClass.reply(res, 404, true, "Product not found");
      }

      const product = results[0];

      if (req.user.id !== product.userId) {
        return commonClass.reply(res, 403, true, "not a authorized");
      }

      const deleteSql = "DELETE FROM product WHERE id = ?";

      db.query(deleteSql, [productId], function (error, result) {
        if (error) {
          console.error(error);
          return commonClass.reply(res, 500, true, "Database error");
        }
        // return res.redirect("back");
        return commonClass.reply(
          res,
          200,
          false,
          "Product deleted successfully!"
        );
      });
    });
  } catch (error) {
    console.error("Internal server error:", error);
    return commonClass.reply(res, 500, true, "Internal server error");
  }
};

module.exports.updateProduct = (req, res) => {
  try {
    const productId = req.params.id;
    const { product_name, price, old_price, description } = req.body;

    const selectSql = "SELECT * FROM product WHERE id = ?";

    db.query(selectSql, [productId], function (error, results) {
      if (error) {
        console.error(error);
        return commonClass.reply(res, 500, true, "Database error");
      }

      if (results.length === 0) {
        return commonClass.reply(res, 404, true, "Product not found");
      }

      const product = results[0];

      if (req.user.id !== product.userId) {
        return commonClass.reply(res, 403, true, "not a authorized");
      }

      const updateSql =
        "UPDATE product SET product_name = ?, price = ?, old_price = ?, description = ? WHERE id = ?";

      db.query(
        updateSql,
        [product_name, price, old_price, description, productId],
        function (error, result) {
          if (error) {
            console.error(error);
            return commonClass.reply(res, 500, true, "Database error");
          }

          if (result.affectedRows === 0) {
            return commonClass.reply(res, 404, true, "Product not found");
          }

          const data = {
            productId,
            product_name,
            price,
            old_price,
            description,
          };
          return commonClass.reply(
            res,
            200,
            false,
            "Product updated successfully.",
            data
          );
        }
      );
    });
  } catch (error) {
    console.error("Internal server error:", error);
    return commonClass.reply(res, 500, true, "Internal server error");
  }
};



