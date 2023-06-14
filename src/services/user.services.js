const db = require("../configs/db.configs");

const checkEmail = async (email) => {
  const query = `SELECT * from users WHERE email = '${email}'`;
  const result = await db.query(query);

  if (result[0][0] == null) {
    return true;
  } else {
    return false;
  }
};

const getAllByEmail = async (email) => {
  const query = `SELECT * from users WHERE email = '${email}'`;
  const result = await db.query(query);

  return result[0][0];
};

const updateUserToken = async (token, id_user) => {
  const query = `UPDATE users SET token = '${token}' WHERE id_user = '${id_user}'`;
  const result = await db.query(query);

  return result;
};

const registerUser = async (username, email, hash_password) => {
  //Create Id
  const id_user = Math.floor(Math.random() * 1000000000 + 1);

  // Default foto
  const foto_user = "https://storage.googleapis.com/staging_product/default-profile.jpg";
  const query = `INSERT INTO users (id_user, username, email, password, token, no_telepon, foto_user) VALUES ('${id_user}', '${username}', '${email}', '${hash_password}', NULL, NULL, '${foto_user}')`;
  const result = await db.query(query);

  return result;
};

const clearToken = async (id_user) => {
  const query = `UPDATE users SET token = NULL WHERE id_user = '${id_user}'`;
  const result = await db.query(query);

  return result;
};

module.exports = {
  checkEmail,
  getAllByEmail,
  updateUserToken,
  registerUser,
  clearToken,
};
