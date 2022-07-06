import usersDal from "../data-access-layer/users-dal.js";

const getAll = () => {
  return usersDal.getAll();
};

const getUserBy = (email) => {
  return usersDal.getUserByEmail(email);
};

const addUser = (newUser) => {
  return usersDal.addNewUser(newUser);
};

const deleteUser = (id,user) => {
  return usersDal.deleteUUser(id,user);
};

const updateUser = (id, user) => {
  return usersDal.update(id, user);
};


export default {
  getAll,
  addUser,
  deleteUser,
  getUserBy,
  updateUser,
};
