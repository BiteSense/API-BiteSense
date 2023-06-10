const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth.middlewares");

const { getScannedProduct, getAllProduct, getDetailProduct, getFavoriteProduct, getLastScannedProduct, updateProductToFavoriteById, uploadProductScan, deleteAllProduct, deleteProductById } = require("../controllers/product.controllers");

//Route to handler Image product from User and show Result to User
router.post("/upload", auth, uploadProductScan);
router.get("/scan", auth, getScannedProduct);
router.get("/lastScan", auth, getLastScannedProduct);
router.get("/all", auth, getAllProduct);
router.get("/favorite", auth, getFavoriteProduct);
router.get("/detail/:id", auth, getDetailProduct);
router.post("/update/:id", auth, updateProductToFavoriteById);
router.delete("/delete/:id", auth, deleteProductById);
router.delete("/delete", auth, deleteAllProduct);

module.exports = router;
