const express = require("express");
const db = require("./src/configs/db.configs");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const multer = require("multer");
const env = require("dotenv");
const port = process.env.PORT || 3000;

const userRoutes = require("./src/routes/user.routes.js");
const productRoutes = require("./src/routes/product.routes.js");
const qrcodeRoutes = require("./src/routes/qrcode.routes");

const app = express();
env.config();
//Middle Multer File
const multerMid = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

try {
  //DB CONNECTION
  db.authenticate();
  console.log("connected");
} catch (error) {
  console.log(error);
}

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(multerMid.single("file"));

// Handling route
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/qrcode", qrcodeRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
