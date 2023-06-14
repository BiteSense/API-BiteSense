const db = require("../configs/db.configs");

const getAllPenyakit = async (id_user) => {
  const query = `
    SELECT p.nama_penyakit , MIN (p.triger_penyakit) AS 'penyakit' FROM users AS u 
    JOIN user_penyakit AS up ON u.id_user = up.id_user
    JOIN penyakit AS p ON up.id_penyakit = p.id_penyakit
    WHERE u.id_user = '${id_user}'
    GROUP BY p.nama_penyakit;
    `;

  const result = await db.query(query);
  return result[0];
};

const getAllKondisi = async (id_user) => {
  const query = `
    SELECT c.name_condition , MIN (c.triger_condition) AS 'kondisi' FROM users AS u 
    JOIN user_condition AS uc ON u.id_user = uc.id_user
    JOIN kondisi c ON uc.id_condition = c.id_condition
    WHERE u.id_user = '${id_user}'
    GROUP BY c.name_condition;
    `;

  const result = await db.query(query);
  return result[0];
};

const getAllFood = async (id_user) => {
  const query = `
    SELECT f.name_food , MIN (f.triger_food) AS 'food' FROM users AS u 
    JOIN user_food AS uf ON u.id_user = uf.id_user
    JOIN food AS f ON uf.id_food = f.id_food
    WHERE u.id_user = '${id_user}'
    GROUP BY f.name_food;
    `;

  const result = await db.query(query);
  return result[0];
};

const getDataPenyakit = async () => {
  query = `SELECT c.nama_penyakit FROM penyakit AS c`;
  const result = await db.query(query);

  return result[0];
};

const getDataFood = async () => {
  query = `SELECT f.name_food FROM food AS f`;
  const result = await db.query(query);

  return result[0];
};

const getDataKondisi = async () => {
  query = `SELECT c.name_condition FROM kondisi AS c`;
  const result = await db.query(query);

  return result[0];
};

const insertKondisi = async (id_user, id) => {
  query = `INSERT INTO user_condition (id_user , id_condition) VALUES ('${id_user}','${id}')`;
  const result = await db.query(query);

  return result;
};

const insertFood = async (id_user, id) => {
  query = `INSERT INTO user_food (id_user , id_food) VALUES ('${id_user}','${id}')`;
  const result = await db.query(query);

  return result;
};

const insertPenyakit = async (id_user, id) => {
  query = `INSERT INTO user_penyakit (id_user , id_penyakit) VALUES ('${id_user}','${id}')`;
  const result = await db.query(query);

  return result;
};

const insertPreference = async (id_user, data) => {
  await data.penyakit.forEach(async (element) => {
    await insertPenyakit(id_user, element.id);
  });
  await data.makanan.forEach(async (element) => {
    await insertFood(id_user, element.id);
  });
  await data.kondisi.forEach(async (element) => {
    await insertKondisi(id_user, element.id);
  });
};

const deleteFood = async (id_user) => {
  query = `DELETE FROM user_food WHERE id_user = '${id_user}'`;
  const result = await db.query(query);

  return result;
};

const deleteCondition = async (id_user) => {
  query = `DELETE FROM user_condition WHERE id_user = '${id_user}'`;
  const result = await db.query(query);

  return result;
};

const deletePenyakit = async (id_user) => {
  query = `DELETE FROM user_penyakit WHERE id_user = '${id_user}'`;
  const result = await db.query(query);

  return result;
};

const deletePreference = async (id_user) => {
  await deleteCondition(id_user);
  await deletePenyakit(id_user);
  await deleteFood(id_user);
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
