const express = require("express");
const auth = require("../middlewares/auth.middlewares");
const routes = express.Router();

const { scanProduct, inputProduct } = require("../controllers/qrcode.controllers");

routes.post("/inputProduct", auth, inputProduct);
routes.post("/scanProduct", auth, scanProduct);

module.exports = routes;
