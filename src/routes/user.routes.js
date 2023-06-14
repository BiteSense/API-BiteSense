const express = require("express");
const routes = express.Router();
const auth = require("../middlewares/auth.middlewares");
const myModule = require("../controllers/user.controllers");
const updateModule = require("../controllers/profile-user.controllers");
const preferenceModule = require("../controllers/preference.controllers");

// User Routes
routes.post("/register", myModule.handlerRegister);
routes.post("/login", myModule.handlerLogin);
routes.delete("/logout", auth, myModule.handlerLogout);

// Profile routess
routes.get("/profile", auth, updateModule.getDataProfile);
routes.post("/profile/email", auth, updateModule.updateEmail);
routes.post("/profile/telepon", auth, updateModule.updateTelepon);
routes.post("/profile/username", auth, updateModule.updateUsername);
routes.post("/profile/upload", auth, updateModule.updateProfile);
routes.delete("/profile/delete", auth, updateModule.deleteProfile);

// Preference routess
routes.get("/preference", auth, preferenceModule.getPreference);
routes.post("/preference", auth, preferenceModule.insertPreference);
routes.post("/preference/update", auth, preferenceModule.updatePreference);
// Preference Data
routes.get("/preference/data", auth, preferenceModule.getDataPreference);
// Category Penyakit
routes.post("/preference/penyakit", auth, preferenceModule.insertPenyakit);
// Category Food Intolarance
routes.post("/preference/makanan", auth, preferenceModule.insertFood);
// Category Condition
routes.post("/preference/kondisi", auth, preferenceModule.insertCondition);

module.exports = routes;
