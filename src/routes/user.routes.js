const express = require("express");
const route = express.Router();
const verifyToken = require("../middlewares/auth.middlewares");
const myModule = require("../controllers/user.controllers");
const updateModule = require("../controllers/profile-user.controllers");
const preferenceModule = require("../controllers/preference.controllers");

// User Routes
route.post("/register", myModule.handlerRegister);
route.post("/login", myModule.handlerLogin);
route.delete("/logout", verifyToken, myModule.handlerLogout);

// Profile Routes
route.get("/profile", verifyToken, updateModule.getDataProfile);
route.post("/profile/email", verifyToken, updateModule.updateEmail);
route.post("/profile/telepon", verifyToken, updateModule.updateTelepon);
route.post("/profile/username", verifyToken, updateModule.updateUsername);
route.post("/profile/upload", verifyToken, updateModule.updateProfile);
route.delete("/profile/delete", verifyToken, updateModule.deleteProfile);

// Preference Routes
route.get("/preference", verifyToken, preferenceModule.getPreference);
route.post("/preference", verifyToken, preferenceModule.insertPreference);
route.post("/preference/update", verifyToken, preferenceModule.updatePreference);
// Preference Data
route.get("/preference/data", verifyToken, preferenceModule.getDataPreference);
// Category Penyakit
route.post("/preference/penyakit", verifyToken, preferenceModule.insertPenyakit);
// Category Food Intolarance
route.post("/preference/makanan", verifyToken, preferenceModule.insertFood);
// Category Condition
route.post("/preference/kondisi", verifyToken, preferenceModule.insertCondition);

module.exports = route;
