const qrcode_service = require("../services/qrcode.services");
const qr_code = require("qrcode");

const qrCodeMaker = async (id_produk) => {
  try {
    const result = await qr_code.toDataURL(id_produk);
    return result;
  } catch (error) {
    return `${error}`;
  }
};

const scanProduct = async (req, res) => {
  try {
    const id_produk = req.body.id_produk;
    const result = await qrcode_service.scan(id_produk);
    res.status(result.statusCode).json(result);
  } catch (error) {
    res.status(500).json({
      statusCode: 500,
      status: "error",
      message: `${error}`,
    });
  }
};

const inputProduct = async (req, res) => {
  try {
    const product = req.body;
    const id_produk = Math.floor(Math.random() * 1000000000 + 1);
    const qrcode_base64 = await qrCodeMaker(`${id_produk}`);

    const result = await qrcode_service.create(id_produk, product.nama_produk, product.komposisi_produk, product.tgl_produksi, product.expired, qrcode_base64);
    res.status(result.statusCode).json(result);
  } catch (error) {
    res.status(500).json({
      statusCode: 500,
      status: "error",
      message: `${error}`,
    });
  }
};

module.exports = { scanProduct, inputProduct };
