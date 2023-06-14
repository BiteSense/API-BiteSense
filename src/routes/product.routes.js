const express = require("express");
const routes = express.Router();
const auth = require("../middlewares/auth.middlewares");

const { getScannedProduct, getAllProduct, getDetailProduct, getFavoriteProduct, getLastScannedProduct, updateProductToFavoriteById, uploadProductScan, deleteAllProduct, deleteProductById } = require("../controllers/product.controllers");

//Route to handler Image product from User and show Result to User
routes.post("/upload", auth, uploadProductScan);
routes.get("/scan", auth, getScannedProduct);
routes.get("/lastScan", auth, getLastScannedProduct);
routes.get("/all", auth, getAllProduct);
routes.get("/favorite", auth, getFavoriteProduct);
routes.get("/detail/:id", auth, getDetailProduct);
routes.post("/update/:id", auth, updateProductToFavoriteById);
routes.delete("/delete/:id", auth, deleteProductById);
routes.delete("/delete", auth, deleteAllProduct);

module.exports = routes;
