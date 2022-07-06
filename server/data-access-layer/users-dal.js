import connection from "../common/database.js";
import CryptoJS from "crypto-js";
import generalSetting from "../common/config.js";

let result = {
  success: false,
  data: null,
};

const getAll = async () => {
  try {
    let resultFromDB = await connection.promise().query("SELECT * FROM users");
    result.success = true;
    result.data = resultFromDB[0];
  } catch (error) {
    result.data = error;
  }
  return result;
};

const getUserByUsername = async (username) => {
  try {
    let resultUser = await connection.promise().query(`SELECT * FROM users 
                    WHERE username = "${username}"`);
    result.success = true;
    result.data = resultUser[0];
  } catch (error) {
    result.success = false;
    result.data = error;
  }
  return result;
};

const addNewUser = async (newUser) => {
  try {
    const cryptoPassword = CryptoJS.AES.encrypt(
      newUser.password,
      generalSetting.CRYPTOJS_KEY
    ).toString();

    let resultPostToDB = await connection.promise()
      .query(`INSERT INTO users (firstName, lastName,username, password, role)
        VALUES
         ('${newUser.firstName}','${newUser.lastName}','${newUser.username}''${cryptoPassword}','user')`);
    result.success = true;
    result.data = resultPostToDB[0];
  } catch (error) {
    result.success = false;
    result.data = error;
  }
  return result;
};

 

const update = async (id, user) => {
  try {
    const updateUserResult = await connection.promise().query(
      `UPDATE users SET firstName=?, lastName=?, userName=?
      WHERE id = ${id}`,
      [user.firstName, user.lastName, user.userName]
    );
    result.success = true;
    result.data = updateUserResult[0];
  } catch (error) {
    result.data = error;
  }
  return result;
};

export default {
  getAll,
  addNewUser,
  getUserByUsername,
  update,
};
