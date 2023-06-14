const db = require("../configs/db.configs");
const upload_image = require("../helpers/upload-image.helpers");
const profile_service = require("../services/profile.services");
const user_service = require("../services/user.services");

const getDataProfile = async (req, res) => {
  const id_user = req.cookies.id_user;

  try {
    const result = await profile_service.getAllById(id_user);

    if (!result)
      return res.status(400).json({
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
    return res.status(500).json({
      statusCode: 500,
      status: "error",
      message: `${error}`,
    });
  }
};

const updateEmail = async (req, res) => {
  const id_user = req.cookies.id_user;

  try {
    const { email } = req.body;

    if (!(await user_service.checkEmail(email)))
      return res.status(400).json({
        statusCode: 400,
        status: "error",
        message: "Email Already Excist",
      });

    if (!(await profile_service.updateEmail(id_user, email)))
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
    return res.status(500).json({
      statusCode: 500,
      status: "error",
      message: `${error}`,
    });
  }
};

const updateTelepon = async (req, res) => {
  const id_user = req.cookies.id_user;

  try {
    const { telepon } = req.body;

    if (await profile_service.getAllByTelepon(telepon))
      return res.status(400).json({
        statusCode: 400,
        status: "error",
        message: "Phone Number Already Excist",
      });

    if (!(await profile_service.updateTelepon(id_user, telepon)))
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
    return res.status(500).json({
      statusCode: 500,
      status: "error",
      message: `${error}`,
    });
  }
};

const updateUsername = async (req, res) => {
  const id_user = req.cookies.id_user;

  try {
    const { username } = req.body;

    if (await profile_service.getAllByUsername(username))
      return res.status(400).json({
        statusCode: 400,
        status: "error",
        message: "Username Already Excist",
      });

    if (!(await profile_service.updateUsername(id_user, username)))
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
    return res.status(500).json({
      statusCode: 500,
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
    const image_url = await upload_image(file);

    const query = `UPDATE users SET foto_user = '${image_url}' WHERE id_user = '${id_user}'`;
    await db.query(query);

    res.status(200).json({
      statusCode: 200,
      status: "success",
      message: "Success Upload Profile Image",
      data: {
        image_url,
      },
    });
  } catch (error) {
    next(error);
    return res.status(500).json({
      statusCode: 500,
      status: "error",
      message: `${error}`,
    });
  }
};

const deleteProfile = async (req, res, next) => {
  const id_user = req.cookies.id_user;

  try {
    const default_profile = "https://storage.googleapis.com/staging_product/default-profile.jpg";

    const query = `UPDATE users SET foto_user = '${default_profile}' WHERE id_user = '${id_user}'`;
    await db.query(query);

    return res.status(200).json({
      statusCode: 200,
      status: "success",
      message: "Succes Delete Profile Image",
    });
  } catch (error) {
    next(error);
    return res.status(500).json({
      statusCode: 500,
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
