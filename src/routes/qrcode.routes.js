const express = require("express");
const auth = require("../middlewares/auth.middlewares");
const router = express.Router();

const { scanProduct, inputProduct } = require("../controllers/qrcode.controllers");

router.post("/inputProduct", auth, inputProduct);
router.post("/scanProduct", auth, scanProduct);

module.exports = router;
