const db = require("../configs/db.configs");
const uploadImage = require("../helpers/upload-image.helpers");
const serviceProfile = require("../services/profile.services");
const serviceUser = require("../services/user.services");

const getDataProfile = async (req, res) => {
  const idUser = req.cookies.id_user;
  try {
    const result = await serviceProfile.getAllById(idUser);

    if (!result)
      return res.json({
        statusCode: 400,
        status: "error",
        message: "Get Data User Failed",
      });

    return res.status(200).json({
      statusCode: 200,
      status: "success",
      message: "Success Get Data User",
      data: {
        result,
      },
    });
  } catch (error) {
    return res.json({
      status: "error",
      message: `${error}`,
    });
  }
};
const updateEmail = async (req, res) => {
  const { email } = req.body;
  const id_user = req.cookies.id_user;
  try {
    if (!(await serviceUser.checkEmail(email)))
      return res.status(400).json({
        statusCode: 400,
        status: "error",
        message: "Email Already Excist",
      });
    if (!(await serviceProfile.updateEmail(id_user, email)))
      return res.status(400).json({
        statusCode: 400,
        status: "error",
        message: "Update Email User Failed",
      });

    return res.status(200).json({
      statusCode: 200,
      status: "success",
      message: "Success Update Email User",
    });
  } catch (error) {
    return res.json({
      status: "error",
      message: `${error}`,
    });
  }
};
const updateTelepon = async (req, res) => {
  const { telepon } = req.body;
  const id_user = req.cookies.id_user;
  try {
    if (await serviceProfile.getAllByTelepon(telepon))
      return res.status(400).json({
        statusCode: 400,
        status: "error",
        message: "Phone Number Already Excist",
      });

    if (!(await serviceProfile.updateTelepon(id_user, telepon)))
      return res.status(400).json({
        statusCode: 400,
        status: "error",
        message: "Update Phone Number Failed",
      });

    return res.status(200).json({
      statusCode: 200,
      status: "success",
      message: "Success Update Phone Number",
    });
  } catch (error) {
    return res.json({
      status: "error",
      message: `${error}`,
    });
  }
};
const updateUsername = async (req, res) => {
  const { username } = req.body;
  const id_user = req.cookies.id_user;
  try {
    if (await serviceProfile.getAllByUsername(username))
      return res.status(400).json({
        statusCode: 400,
        status: "error",
        message: "Username Already Excist",
      });

    if (!(await serviceProfile.updateUsername(id_user, username)))
      return res.status(400).json({
        statusCode: 400,
        status: "error",
        message: "Update Username Failed",
      });

    return res.status(200).json({
      statusCode: 200,
      status: "success",
      message: "Success Update Username",
    });
  } catch (error) {
    return res.json({
      status: "error",
      message: `${error}`,
    });
  }
};
const updateProfile = async (req, res, next) => {
  const id_user = req.cookies.id_user;
  try {
    const file = req.file;
    file.originalname = `${Date.now()}${id_user}${file.originalname}`;
    const publicUrl = await uploadImage(file);
    sql = `UPDATE users SET foto_user = '${publicUrl}' WHERE id_user = '${id_user}'`;
    await db.query(sql);

    res.status(200).json({
      statusCode: 200,
      status: "success",
      message: "Success Upload Profile Image",
      data: {
        publicUrl,
      },
    });
  } catch (error) {
    next(error);
    return res.json({
      status: "error",
      message: `${error}`,
    });
  }
};
const deleteProfile = async (req, res, next) => {
  const id_user = req.cookies.id_user;
  try {
    const defaultProfile = "https://storage.googleapis.com/staging_product/default-profile.jpg";
    const sql = `UPDATE users SET foto_user = '${defaultProfile}' WHERE id_user = '${id_user}'`;
    await db.query(sql);

    return res.status(200).json({
      statusCode: 200,
      status: "success",
      message: "Succes Delete Profile Image",
    });
  } catch (error) {
    next(error);
    return res.json({
      status: "error",
      message: `${error}`,
    });
  }
};

module.exports = {
  updateEmail,
  updateTelepon,
  updateUsername,
  updateProfile,
  deleteProfile,
  getDataProfile,
};
