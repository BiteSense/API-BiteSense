const preference_service = require("../services/preference.services");

const getPreference = async (req, res) => {
  const id_user = req.cookies.id_user;

  try {
    const data_penyakit = await preference_service.getAllPenyakit(id_user);
    const data_kondisi = await preference_service.getAllKondisi(id_user);
    const data_food = await preference_service.getAllFood(id_user);

    return res.status(200).json({
      statusCode: 200,
      status: "success",
      message: "Success Get Data Preference User",
      data: {
        data_penyakit,
        data_kondisi,
        data_food,
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

const getDataPreference = async (req, res) => {
  try {
    const data_food = await preference_service.getDataFood();
    const data_kondisi = await preference_service.getDataKondisi();
    const data_penyakit = await preference_service.getDataPenyakit();

    return res.status(200).json({
      statusCode: 200,
      status: "success",
      message: "Success Get All Data Preference",
      data: {
        data_food,
        data_kondisi,
        data_penyakit,
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

const insertPenyakit = async (req, res) => {
  const id_user = req.cookies.id_user;

  try {
    const { penyakit } = req.body;
    await preference_service.insertPenyakit(id_user, penyakit);

    return res.status(201).json({
      statusCode: 201,
      status: "success",
      message: "Success Input Data Preference User",
    });
  } catch (error) {
    return res.status(500).json({
      statusCode: 500,
      status: "error",
      message: `${error}`,
    });
  }
};

const insertFood = async (req, res) => {
  const id_user = req.cookies.id_user;

  try {
    const { makanan } = req.body;
    await preference_service.insertFood(id_user, makanan);

    return res.status(201).json({
      statusCode: 201,
      status: "success",
      message: "Success Input Data Preference User",
    });
  } catch (error) {
    return res.status(500).json({
      statusCode: 500,
      status: "error",
      message: `${error}`,
    });
  }
};

const insertCondition = async (req, res) => {
  const id_user = req.cookies.id_user;

  try {
    const { kondisi } = req.body;
    await preference_service.insertKondisi(id_user, kondisi);

    return res.status(201).json({
      statusCode: 201,
      status: "success",
      message: "Success Input Data Preference User",
    });
  } catch (error) {
    return res.status(500).json({
      statusCode: 500,
      status: "error",
      message: `${error}`,
    });
  }
};

const insertPreference = async (req, res) => {
  const id_user = req.cookies.id_user;

  try {
    const data = req.body;
    await preference_service.insertPreference(id_user, data);

    return res.status(201).json({
      statusCode: 201,
      status: "success",
      message: "Success Input Data Preference User",
    });
  } catch (error) {
    return res.status(500).json({
      statusCode: 500,
      status: "error",
      message: `${error}`,
    });
  }
};

const updatePreference = async (req, res) => {
  const id_user = req.cookies.id_user;

  try {
    const data = req.body;
    await preference_service.deletePreference(id_user);
    await preference_service.insertPreference(id_user, data);

    return res.status(201).json({
      statusCode: 201,
      status: "success",
      message: "Success Update Data Preference User",
    });
  } catch (error) {
    return res.status(500).json({
      statusCode: 500,
      status: "error",
      message: `${error}`,
    });
  }
};

module.exports = {
  insertPenyakit,
  insertCondition,
  insertFood,
  getPreference,
  getDataPreference,
  insertPreference,
  updatePreference,
};
