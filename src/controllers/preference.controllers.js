const db = require("../configs/db.configs");
const service = require("../services/preference.services");

const getPreference = async (req, res) => {
  const idUser = req.cookies.id_user;
  try {
    const dataPenyakit = await service.getAllPenyakit(idUser);
    const dataKondisi = await service.getAllKondisi(idUser);
    const dataFood = await service.getAllFood(idUser);
    return res.status(200).json({
      statusCode: 200,
      status: "success",
      message: "Success Get Data Preference User",
      data: {
        dataPenyakit,
        dataKondisi,
        dataFood,
      },
    });
  } catch (error) {
    return res.json({
      status: "error",
      message: `${error}`,
    });
  }
};
const getDataPreference = async (req, res) => {
  try {
    const dataFood = await service.getDataFood();
    const dataKondisi = await service.getDataKondisi();
    const dataPenyakit = await service.getDataPenyakit();

    return res.status(200).json({
      statusCode: 200,
      status: "success",
      message: "Success Get All Data Preference",
      data: {
        dataFood,
        dataKondisi,
        dataPenyakit,
      },
    });
  } catch (error) {
    return res.json({
      status: "error",
      message: `${error}`,
    });
  }
};
const insertPenyakit = async (req, res) => {
  const id_user = req.cookies.id_user;
  try {
    const { penyakit } = req.body;
    await service.insertPenyakit(id_user, penyakit);

    return res.status(200).json({
      statusCode: 200,
      status: "success",
      message: "Success Input Data Preference User",
    });
  } catch (error) {
    return res.json({
      status: "error",
      message: `${error}`,
    });
  }
};
const insertFood = async (req, res) => {
  const id_user = req.cookies.id_user;
  try {
    const { makanan } = req.body;

    await service.insertFood(id_user, makanan);

    return res.status(200).json({
      statusCode: 200,
      status: "success",
      message: "Success Input Data Preference User",
    });
  } catch (error) {
    return res.json({
      status: "error",
      message: `${error}`,
    });
  }
};

const insertCondition = async (req, res) => {
  const id_user = req.cookies.id_user;
  try {
    const { kondisi } = req.body;

    await service.insertKondisi(id_user, kondisi);

    return res.status(200).json({
      statusCode: 200,
      status: "success",
      message: "Success Input Data Preference User",
    });
  } catch (error) {
    return res.json({
      status: "error",
      message: `${error}`,
    });
  }
};
const insertPreference = async (req, res) => {
  const id_user = req.cookies.id_user;
  const data = req.body;
  try {
    await service.insertPreference(id_user, data);
    return res.status(200).json({
      statusCode: 200,
      status: "success",
      message: "Success Input Data Preference User",
    });
  } catch (error) {
    return res.json({
      status: "error",
      message: `${error}`,
    });
  }
};
const updatePreference = async (req, res) => {
  const id_user = req.cookies.id_user;
  const data = req.body;
  try {
    await service.deletePreference(id_user);
    await service.insertPreference(id_user, data);

    return res.status(200).json({
      statusCode: 200,
      status: "success",
      message: "Success Update Data Preference User",
    });
  } catch (error) {
    return res.json({
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
