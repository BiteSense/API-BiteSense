const db = require("../configs/db.configs");

const getAllPenyakit = async (idUser) => {
  const sql = `
    SELECT p.nama_penyakit , MIN(p.triger_penyakit) FROM users AS u 
    JOIN user_penyakit AS up ON u.id_user = up.id_user
    JOIN penyakit AS p ON up.id_penyakit = p.id_penyakit
    WHERE u.id_user = '${idUser}'
    GROUP BY p.nama_penyakit;
    `;

  const result = await db.query(sql);
  return result[0];
};
const getAllKondisi = async (idUser) => {
  const sql = `
    SELECT c.name_condition , MIN(c.triger_condition) FROM users AS u 
    JOIN user_condition AS uc ON u.id_user = uc.id_user
    JOIN kondisi c ON uc.id_condition = c.id_condition
    WHERE u.id_user = '${idUser}'
    GROUP BY c.name_condition;
    `;

  const result = await db.query(sql);
  return result[0];
};
const getAllFood = async (idUser) => {
  const sql = `
    SELECT f.name_food , MIN(f.triger_food) FROM users AS u 
    JOIN user_food AS uf ON u.id_user = uf.id_user
    JOIN food AS f ON uf.id_food = f.id_food
    WHERE u.id_user = '${idUser}'
    GROUP BY f.name_food;
    `;

  const result = await db.query(sql);
  console.log(result[0]);
  return result[0];
};
const getDataPenyakit = async () => {
  sql = `SELECT c.nama_penyakit FROM penyakit AS c`;
  const result = await db.query(sql);
  return result[0];
};
const getDataFood = async () => {
  sql = `SELECT f.name_food FROM food AS f`;
  const result = await db.query(sql);
  return result[0];
};
const getDataKondisi = async () => {
  sql = `SELECT c.name_condition FROM kondisi AS c`;
  const result = await db.query(sql);
  return result[0];
};
const insertKondisi = async (idUser, id) => {
  sql = `INSERT INTO user_condition (id_user , id_condition) VALUES ('${idUser}','${id}')`;
  const result = await db.query(sql);

  return result;
};
const insertFood = async (idUser, id) => {
  sql = `INSERT INTO user_food (id_user , id_food) VALUES ('${idUser}','${id}')`;
  const result = await db.query(sql);

  return result;
};
const insertPenyakit = async (idUser, id) => {
  sql = `INSERT INTO user_penyakit (id_user , id_penyakit) VALUES ('${idUser}','${id}')`;
  const result = await db.query(sql);

  return result;
};
const insertPreference = async (idUser, data) => {
  await data.penyakit.forEach(async (element) => {
    await insertPenyakit(idUser, element.id);
  });
  await data.makanan.forEach(async (element) => {
    await insertFood(idUser, element.id);
  });
  await data.kondisi.forEach(async (element) => {
    await insertKondisi(idUser, element.id);
  });
};
const deleteFood = async (idUser) => {
  sql = `DELETE FROM user_food WHERE id_user = '${idUser}'`;
  const result = await db.query(sql);

  return result;
};
const deleteCondition = async (idUser) => {
  sql = `DELETE FROM user_condition WHERE id_user = '${idUser}'`;
  const result = await db.query(sql);

  return result;
};
const deletePenyakit = async (idUser) => {
  sql = `DELETE FROM user_penyakit WHERE id_user = '${idUser}'`;
  const result = await db.query(sql);

  return result;
};
const deletePreference = async (idUser) => {
  await deleteCondition(idUser);
  await deletePenyakit(idUser);
  await deleteFood(idUser);
};

module.exports = {
  getAllPenyakit,
  getAllKondisi,
  getAllFood,
  getDataKondisi,
  getDataFood,
  getDataPenyakit,
  deletePreference,
  insertFood,
  insertKondisi,
  insertPenyakit,
  insertPreference,
};
