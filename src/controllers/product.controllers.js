const axios = require("axios");
const product_service = require("../services/product.services");
const upload_image = require("../helpers/upload-image.helpers");
const { getAllPenyakit, getAllKondisi, getAllFood } = require("../services/preference.services");

const getScannedProduct = async (req, res) => {
  const jumlah_scan_produk = req.cookies.jumlah_scan_produk;
  const id_user = req.cookies.id_user;

  try {
    const result = await product_service.findScan(jumlah_scan_produk, id_user);
    res.status(result.statusCode).json(result);
  } catch (error) {
    res.status(500).json({
      statusCode: 500,
      status: "error",
      message: `${error}`,
    });
  }
};

const getAllProduct = async (req, res) => {
  const id_user = req.cookies.id_user;

  try {
    const result = await product_service.findAll(id_user);
    res.status(result.statusCode).json(result);
  } catch (error) {
    res.status(500).json({
      statusCode: 500,
      status: "error",
      message: `${error}`,
    });
  }
};

const getDetailProduct = async (req, res) => {
  const id = req.params.id;

  try {
    const result = await product_service.findOne(id);
    res.status(result.statusCode).json(result);
  } catch (error) {
    res.status(500).json({
      statusCode: 500,
      status: "error",
      message: `${error}`,
    });
  }
};

const getLastScannedProduct = async (req, res) => {
  const id_user = req.cookies.id_user;

  try {
    const result = await product_service.findLastScan(id_user);
    res.status(result.statusCode).json(result);
  } catch (error) {
    res.status(500).json({
      statusCode: 500,
      status: "error",
      message: `${error}`,
    });
  }
};

const getFavoriteProduct = async (req, res) => {
  const id_user = req.cookies.id_user;

  try {
    const result = await product_service.findAllByFavorite(id_user);
    res.status(result.statusCode).json(result);
  } catch (error) {
    res.status(500).json({
      statusCode: 500,
      status: "error",
      message: `${error}`,
    });
  }
};

const uploadProductScan = async (req, res, next) => {
  const id_user = req.cookies.id_user;

  try {
    const file = req.file;
    file.originalname = `${Date.now()}${id_user}${file.originalname}`;
    const image_url = await upload_image(file);

    const { data } = await axios.get(process.env.PREDICT_URL, { params: { url: image_url } });
    const label = JSON.parse(data[1].body);

    const penyakit_user = await getAllPenyakit(id_user);
    const kondisi_user = await getAllKondisi(id_user);
    const food_user = await getAllFood(id_user);
    const result = await product_service.create(label.text, penyakit_user, kondisi_user, food_user, id_user);

    res.cookie("jumlah_scan_produk", label.text.length);
    res.status(result.statusCode).json(result);
  } catch (error) {
    next(error);
    res.status(500).json({
      statusCode: 500,
      status: "error",
      message: `${error}`,
    });
  }
};

const updateProductToFavoriteById = async (req, res) => {
  const id = req.params.id;

  try {
    const result = await product_service.updateOne(id);
    res.status(result.statusCode).json(result);
  } catch (error) {
    res.status(500).json({
      statusCode: 500,
      status: "error",
      message: `${error}`,
    });
  }
};

const deleteProductById = async (req, res) => {
  const id = req.params.id;

  try {
    const result = await product_service.deleteOne(id);
    res.status(result.statusCode).json(result);
  } catch (error) {
    res.status(500).json({
      statusCode: 500,
      status: "error",
      message: `${error}`,
    });
  }
};

const deleteAllProduct = async (req, res) => {
  const id_user = req.cookies.id_user;

  try {
    const result = await product_service.deleteAll(id_user);
    res.status(result.statusCode).json(result);
  } catch (error) {
    res.status(500).json({
      statusCode: 500,
      status: "error",
      message: `${error}`,
    });
  }
};

module.exports = { getScannedProduct, getAllProduct, getDetailProduct, getFavoriteProduct, getLastScannedProduct, updateProductToFavoriteById, uploadProductScan, deleteAllProduct, deleteProductById };
