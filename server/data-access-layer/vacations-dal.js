import connection from "../common/database.js";

let vacationsResult = {
  success: false,
  data: null,
};
// vacations without followers 

const getAll = async () => {
  try {
    let getAllResult = await connection
      .promise()
      .query("SELECT * FROM vacations");
    vacationsResult.success = true;
    vacationsResult.data = getAllResult[0];
  } catch (error) {
    vacationsResult.data = error;
  }
  return vacationsResult;
};

// vacations with followers 

const getAllVacationsFollowed = async () => {
  try {
    let getAllResult = await connection
      .promise()
      .query("SELECT * FROM vacations join follow");
    vacationsResult.success = true;
    vacationsResult.data = getAllResult[0];
  } catch (error) {
    vacationsResult.data = error;
  }
  return vacationsResult;
};

//vacations by id without followers

const getVacationById = async (vacationId) => {
  try {
    let getVacationResult = await connection
      .promise()
      .query(`SELECT * FROM vacations WHERE vacationId = ${vacationId}`);
    vacationsResult.success = true;
    vacationsResult.data = getVacationResult[0];
  } catch (error) {
    vacationsResult.data = error;
  }
  return vacationsResult;
};

// count of followers 

const getAllFollowers = async () => {
  try {
    let followersResult = await connection
      .promise()
      .query(`SELECT followers FROM follow`);
    vacationsResult.success = true;
    vacationsResult.data = followersResult[0];
  } catch (error) {
    vacationsResult.data = error;
  }
  return vacationsResult;
};

const getNumOfVacationsFollowers = async () => {
  try {
    let followersResult = await connection.promise()
      .query(`SELECT vacationId, COUNT(userId) AS followers FROM follow
      GROUP BY vacationId;`);
    vacationsResult.success = true;
    vacationsResult.data = followersResult[0];
  } catch (error) {
    vacationsResult.data = error;
  }
  return vacationsResult;
};

const anddNewVacation = async (newVacation) => {
  try {
    let postResult = await connection.promise()
      .query(`INSERT INTO vacations (cityName,country, descriptions, img, price, dateFrom, dateUntil, followers, userId)
        VALUES
         ("${newVacation.city}","${newVacation.country}", "${newVacation.descriptions}","${newVacation.image}","${newVacation.price}", "${newVacation.dateFrom}", "${newVacation.dateUntill}")`);
    vacationsResult.success = true;
    vacationsResult.data = postResult[0];
  } catch (error) {
    vacationsResult.data = error;
  }
  return vacationsResult;
};

const addNewFollowerToDB = async (userId, vacationId) => {
  try {
    let postFollowerResult = await connection.promise()
      .query(`INSERT INTO follow  (userId, vacationId)
      VALUES
       ('${userId}', '${vacationId}')`);
    vacationsResult.success = true;
    vacationsResult.data = postFollowerResult[0];
  } catch (error) {
    vacationsResult.data = error;
  }
  return vacationsResult;
};

const update = async (id, vacationToUpdate) => {
  try {
    const result = await connection.promise().query(
      `UPDATE vacations SET city=?, country=?, descriptions=?, img=?, price=?, dateFrom=?, dateUntil=?
      WHERE id = ${id}`,
      [
        vacationToUpdate.city,
        vacationToUpdate.country,
        vacationToUpdate.descriptions,
        vacationToUpdate.img,
        vacationToUpdate.price,
        vacationToUpdate.dateFrom,
        vacationToUpdate.dateUntill,
      ]
    );
    vacationsResult.success = true;
    vacationsResult.data = result[0];
  } catch (error) {
    vacationsResult.data = error;
  }
  return vacationsResult;
};

const deleteVacation = async (vacationId) => {
  try {
    let deleteFollowersResult = await connection
      .promise()
      .query(`DELETE FROM follow WHERE vacationId = ${vacationId}`);
    let deleteResult = await connection
      .promise()
      .query(`DELETE FROM vacations WHERE id = ${vacationId}`);

    vacationsResult.success = true;
    vacationsResult.data = deleteResult[0];
  } catch (error) {
    vacationsResult.data = error;
  }
  return vacationsResult;
};

const deleteFollower = async (vacationId, userId) => {
  try {
    let deleteFollowerResult = await connection
      .promise()
      .query(
        `DELETE FROM follow WHERE vacationId = ${vacationId} && userId = ${userId}`
      );
    vacationsResult.success = true;
    vacationsResult.data = deleteFollowerResult[0];
  } catch (error) {
    vacationsResult.data = error;
  }
  return vacationsResult;
};

export default {
  getAll,
  getAllVacationsFollowed,
  getVacationById,
  anddNewVacation,
  deleteVacation,
  getNumOfVacationsFollowers,
  getAllFollowers,
  addNewFollowerToDB,
  deleteFollower,
  update,
};
