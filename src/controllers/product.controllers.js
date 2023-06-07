const axios = require("axios");
const product = require("../services/product.services");
const uploadImage = require("../helpers/upload-image.helpers");

const getScannedProduct = async (req, res) => {
  const jumlah_scan_produk = req.cookies.jumlah_scan_produk;
  const id_user = req.cookies.id_user;

  try {
    const result = await product.findScan(jumlah_scan_produk, id_user);
    res.status(result.statusCode).json(result);
  } catch (error) {
    res.json({
      status: "error",
      message: `${error}`,
    });
  }
};

const getAllProduct = async (req, res) => {
  const id_user = req.cookies.id_user;

  try {
    const result = await product.findAll(id_user);
    res.status(result.statusCode).json(result);
  } catch (error) {
    res.json({
      status: "error",
      message: `${error}`,
    });
  }
};

const getDetailProduct = async (req, res) => {
  const id = req.params.id;

  try {
    const result = await product.findOne(id);
    res.status(result.statusCode).json(result);
  } catch (error) {
    res.json({
      status: "error",
      message: `${error}`,
    });
  }
};

const getLastScannedProduct = async (req, res) => {
  const id_user = req.cookies.id_user;

  try {
    const result = await product.findLastScan(id_user);
    res.status(result.statusCode).json(result);
  } catch (error) {
    res.json({
      status: "error",
      message: `${error}`,
    });
  }
};

const getFavoriteProduct = async (req, res) => {
  const id_user = req.cookies.id_user;

  try {
    const result = await product.findAllByFavorite(id_user);
    res.status(result.statusCode).json(result);
  } catch (error) {
    res.json({
      status: "error",
      message: `${error}`,
    });
  }
};

const uploadProductScan = async (req, res) => {
  const id_user = req.cookies.id_user;

  try {
    const file = req.file;
    file.originalname = `${Date.now()}${id_user}${file.originalname}`;

    const imageUrl = await uploadImage(file);

    const { data } = await axios.get(
      "http://0.0.0.0:8080/prediction",
      { imageUrl: imageUrl },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const result = await product.create(data.products, id_user);
    res.cookie("jumlah_scan_produk", data.products.length);
    res.status(result.statusCode).json(result);
  } catch (error) {
    res.json({
      status: "error",
      message: `${error}`,
    });
  }
};

const updateProductToFavoriteById = async (req, res) => {
  const id = req.params.id;

  try {
    const result = await product.updateOne(id);
    res.status(result.statusCode).json(result);
  } catch (error) {
    res.json({
      status: "error",
      message: `${error}`,
    });
  }
};

const deleteProductById = async (req, res) => {
  const id = req.params.id;

  try {
    const result = await product.deleteOne(id);
    res.status(result.statusCode).json(result);
  } catch (error) {
    res.json({
      status: "error",
      message: `${error}`,
    });
  }
};

const deleteAllProduct = async (req, res) => {
  const id_user = req.cookies.id_user;

  try {
    const result = await product.deleteAll(id_user);
    res.status(result.statusCode).json(result);
  } catch (error) {
    res.json({
      status: "error",
      message: `${error}`,
    });
  }
};

module.exports = { getScannedProduct, getAllProduct, getDetailProduct, getFavoriteProduct, getLastScannedProduct, updateProductToFavoriteById, uploadProductScan, deleteAllProduct, deleteProductById };
