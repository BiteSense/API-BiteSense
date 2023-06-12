const db = require("../configs/db.configs");

const scan = async (id_produk) => {
  const query = "SELECT * FROM qrcode_produk WHERE id_produk = ?";
  const result = await db.query(query, { replacements: [id_produk] });

  if (!result[0]) {
    return {
      statusCode: 400,
      status: "error",
      message: "Get Data Product Scanned Failed",
    };
  }

  return {
    statusCode: 200,
    status: "success",
    message: "Success Get Data Product Scanned",
    data: result[0],
  };
};

const create = async (id_produk, nama_produk, komposisi_produk, expired, qrcode) => {
  const query = "INSERT INTO qrcode_produk (id_produk,nama_produk,komposisi_produk,expired,qrcode) VALUES (?,?,?,?,?)";
  const result = await db.query(query, { replacements: [id_produk, nama_produk, komposisi_produk, expired, qrcode] });

  if (!result) {
    return {
      statusCode: 400,
      status: "error",
      message: "Failed to Input Product",
    };
  }

  return {
    statusCode: 201,
    status: "success",
    message: "Succes Input Product",
    data: qrcode,
  };
};

module.exports = { scan, create };
