const { Router } = require("express");
//CONTROLLER
const {
  allProducts,
  getProduct,
  createProduct,
  searchProduct,
  ratingProduct,
  updateProduct,
} = require("../controllers/ProductController");
const productRoutes = Router();

productRoutes.get("/", searchProduct);
productRoutes.get('/rating/all/:name', ratingProduct);
productRoutes.get("/all", allProducts);
productRoutes.get("/:slug", getProduct);
productRoutes.post("/create", createProduct);
productRoutes.put("/update/:id", updateProduct);

module.exports = productRoutes;
