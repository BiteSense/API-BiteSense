const qrcode = require("../services/qrcode.services");
const QRCode = require("qrcode");

const QRCodeMaker = async (id_produk) => {
  try {
    const result = await QRCode.toDataURL(id_produk);
    return result;
  } catch (error) {
    return `${error}`;
  }
};

const scanProduct = async (req, res) => {
  try {
    const id_produk = req.body.id_produk;
    const result = await qrcode.scan(id_produk);
    res.status(result.statusCode).json(result);
  } catch (error) {
    res.json({
      status: "error",
      message: `${error}`,
    });
  }
};

const inputProduct = async (req, res) => {
  const product = req.body;

  try {
    const id_produk = Math.floor(Math.random() * 1000000000 + 1);
    const QRCodeBase64 = await QRCodeMaker(`${id_produk}`);
    const result = await qrcode.create(id_produk, product.nama_produk, product.komposisi_produk, product.expired, product.tgl_produksi, QRCodeBase64);
    res.status(result.statusCode).json(result);
  } catch (error) {
    res.json({
      status: "error",
      message: `${error}`,
    });
  }
};

module.exports = { scanProduct, inputProduct };
