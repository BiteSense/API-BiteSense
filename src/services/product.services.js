const db = require("../configs/db.configs");

const findScan = async (jumlah_scan_produk, id_user) => {
  const query = `SELECT * FROM produk LEFT JOIN detail_produk ON produk.id_detail = detail_produk.id_detail WHERE id_user = ? ORDER BY id_produk DESC LIMIT ${jumlah_scan_produk}`;
  const result = await db.query(query, { replacements: [id_user] });

  if (result[0].length == 0) {
    return {
      statusCode: 400,
      status: "error",
      message: "Product not Recognized",
    };
  }

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

const findAll = async (id_user) => {
  const query = `SELECT * FROM produk LEFT JOIN detail_produk ON produk.id_detail = detail_produk.id_detail WHERE id_user = ? ORDER BY id_produk DESC`;
  const result = await db.query(query, { replacements: [id_user] });

  if (!result[0]) {
    return {
      statusCode: 400,
      status: "error",
      message: "Get Data All Product Failed",
    };
  }
  return {
    statusCode: 200,
    status: "success",
    message: "Success Get Data All Product",
    data: result[0],
  };
};

const findOne = async (id) => {
  const query = `SELECT * FROM produk LEFT JOIN detail_produk ON produk.id_detail = detail_produk.id_detail WHERE id_produk = ?`;
  const result = await db.query(query, { replacements: [id] });

  if (!result[0][0]) {
    return {
      statusCode: 404,
      status: "error",
      message: "Product Not Found",
    };
  }

  return {
    statusCode: 200,
    status: "success",
    message: "Success Get Data Product",
    data: result[0][0],
  };
};

const findLastScan = async (id_user) => {
  const query = `SELECT * FROM produk LEFT JOIN detail_produk ON produk.id_detail = detail_produk.id_detail WHERE id_user = ? ORDER BY id_produk DESC LIMIT 5`;
  const result = await db.query(query, { replacements: [id_user] });

  if (!result[0]) {
    return {
      statusCode: 400,
      status: "error",
      message: "Get Data Product LastScanned Failed",
    };
  }

  return {
    statusCode: 200,
    status: "success",
    message: "Success Get Data Product LastScanned",
    data: result[0],
  };
};

const findAllByFavorite = async (id_user) => {
  const query = `SELECT * FROM produk LEFT JOIN detail_produk ON produk.id_detail = detail_produk.id_detail WHERE favorite = true AND id_user = ?`;
  const result = await db.query(query, { replacements: [id_user] });

  if (!result[0]) {
    return {
      statusCode: 400,
      status: "error",
      message: "Get Data Product Favorite Failed",
    };
  }

  return {
    statusCode: 200,
    status: "success",
    message: "Success Get Data Product Favorite",
    data: result[0],
  };
};

const create = async (products, penyakit_user, kondisi_user, food_user, id_user) => {
  if (products.length == 0) {
    return {
      statusCode: 400,
      status: "error",
      message: "Product not Recognized",
    };
  } else {
    for (let i = 0; i < products.length; i++) {
      const query = `SELECT id_detail, alergen_produk from detail_produk WHERE nama_produk = ?`;
      const result = await db.query(query, { replacements: [products[0]] });

      if (!result[0][0]) {
        return {
          statusCode: 404,
          status: "error",
          message: "Product Name Incorrect",
        };
      }

      const alergen_produk = result[0][0].alergen_produk.split(",");
      let counter = 0;
      let alert = 0;
      if (penyakit_user !== undefined) {
        for (let i = 0; i < penyakit_user.length; i++) {
          const triger_penyakit = penyakit_user[i].penyakit.split(",");
          for (let j = 0; j < triger_penyakit.length; j++) {
            if (alergen_produk.includes(triger_penyakit[j])) {
              counter++;
              alert = 2;
              break;
            }
          }
        }
      }

      if (counter == 0) {
        if (food_user !== undefined) {
          for (let i = 0; i < food_user.length; i++) {
            const triger_food = food_user[i].food.split(",");
            for (let j = 0; j < triger_food.length; j++) {
              if (alergen_produk.includes(triger_food[j])) {
                counter++;
                alert = 2;
                break;
              }
            }
          }
        }
      }

      if (counter == 0) {
        if (kondisi_user !== undefined) {
          for (let i = 0; i < kondisi_user.length; i++) {
            const triger_kondisi = kondisi_user[i].kondisi.split(",");
            for (let j = 0; j < triger_kondisi.length; j++) {
              if (alergen_produk.includes(triger_kondisi[j])) {
                counter++;
              }
            }
            if (counter > 0 && counter == triger_kondisi.length) {
              alert = 2;
            } else {
              alert = 1;
            }
          }
        }
      }

      const query1 = `INSERT INTO produk (nama_produk, alert, favorite, id_user, id_detail) VALUES (?,?,?,?,?)`;
      const result1 = await db.query(query1, { replacements: [products[i], alert, false, id_user, result[0][0].id_detail] });

      if (!result1) {
        return {
          statusCode: 400,
          status: "error",
          message: "Failed to Input Product",
        };
      }
    }
  }

  return {
    statusCode: 201,
    status: "success",
    message: "Succes Input Product",
  };
};

const updateOne = async (id) => {
  const query = `SELECT favorite from produk WHERE id_produk = ?`;
  const result = await db.query(query, { replacements: [id] });

  if (!result[0][0]) {
    return {
      statusCode: 404,
      status: "error",
      message: "Product Not Found",
    };
  }

  const favorite = !result[0][0].favorite;
  const query1 = `UPDATE produk SET favorite = ? WHERE id_produk = ?`;
  const result1 = await db.query(query1, { replacements: [favorite, id] });

  if (!result1) {
    return {
      statusCode: 403,
      status: "error",
      message: "Product Failed to Update",
    };
  }

  return {
    statusCode: 202,
    status: "success",
    message: "Product has been Updated",
  };
};

const deleteOne = async (id) => {
  const query = `DELETE from produk WHERE id_produk = ?`;
  const result = await db.query(query, { replacements: [id] });

  if (!result) {
    return {
      statusCode: 400,
      status: "error",
      message: "Failed to Delete Product",
    };
  }

  return {
    statusCode: 202,
    status: "success",
    message: "Product has been Deleted",
  };
};

const deleteAll = async (id_user) => {
  const query = `DELETE FROM produk WHERE id_user = ?`;
  const result = await db.query(query, { replacements: [id_user] });

  if (!result) {
    return {
      statusCode: 400,
      status: "error",
      message: "Failed to Delete All Product",
    };
  }

  return {
    statusCode: 202,
    status: "success",
    message: "All Product has been Deleted",
  };
};

module.exports = { findScan, findAll, findOne, findLastScan, findAllByFavorite, create, updateOne, deleteOne, deleteAll };
