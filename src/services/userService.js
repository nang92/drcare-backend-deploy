import bcrypt from 'bcryptjs';
import db from '../models/index.js';

const salt = bcrypt.genSaltSync(10);
let hashUserPassword = (password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let salt = await bcrypt.genSalt(10);
      let hashPassword = await bcrypt.hash(password, salt);
      resolve(hashPassword);
    } catch (error) {
      reject(error);
    }
  });
};

let handleUserLogin = async (email, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let userData = {};
      let isExist = await checkUserEmail(email);
      if (isExist) {
        let user = await db.User.findOne({
          where: { email: email },
          attributes: ['email', 'password', 'roleId', 'firstName', 'lastName'],
          raw: true,
        });
        if (user) {
          let check = await bcrypt.compareSync(password, user.password);
          if (check) {
            userData.errCode = 0;
            userData.errMessage = 'Login success';
            delete user.password;
            userData.user = user;
          } else {
            userData.errCode = 2;
            userData.errMessage = 'Username or password is incorrect';
          }
        } else {
          userData.errCode = 2;
          userData.errMessage = 'Username or password is incorrect';
        }
      } else {
        userData.errCode = 1;
        userData.errMessage = 'User does not exist';
      }

      resolve(userData);
    } catch (error) {
      reject(error);
    }
  });
};

let checkUserEmail = (userEmail) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { email: userEmail },
      });
      if (user) {
        resolve(true);
      } else {
        resolve(false);
      }
    } catch (error) {
      reject(error);
    }
  });
};

let getAllUsers = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let users = '';
      if (userId === 'ALL') {
        users = await db.User.findAll({
          attributes: {
            exclude: ['password'],
          },
        });
      }
      if (userId && userId !== 'ALL') {
        users = await db.User.findOne({
          where: { id: userId },
          attributes: {
            exclude: ['password'],
          },
        });
      }

      resolve(users);
    } catch (error) {
      reject(error);
    }
  });
};

let createNewUser = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      // check email exist
      let check = await checkUserEmail(data.email);
      if (check === true) {
        resolve({
          errCode: 1,
          errMessage: 'Email is exist',
        });
        return;
      }
      let hashPasswordFromBcrypt = await hashUserPassword(data.password);
      await db.User.create({
        email: data.email,
        password: hashPasswordFromBcrypt,
        firstName: data.firstName,
        lastName: data.lastName,
        address: data.address,
        phonenumber: data.phonenumber,
        gender: data.gender,
        roleId: data.roleId,
        positionId: data.positionId,
        image: data.avatar,
      });
      resolve({
        errCode: 0,
        message: 'Create new user successfully',
      });
    } catch (error) {
      reject(error);
    }
  });
};

let editUserService = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id || !data.roleId || !data.positionId || !data.gender) {
        resolve({
          errCode: 1,
          errMessage: 'Missing required parameter',
        });
        return;
      }
      let user = await db.User.findOne({
        where: { id: data.id },
        raw: false,
      });
      if (user) {
        user.firstName = data.firstName;
        user.lastName = data.lastName;
        user.address = data.address;
        user.phonenumber = data.phonenumber;
        user.roleId = data.roleId;
        user.positionId = data.positionId;
        user.gender = data.gender;

        if (data.avatar) {
          user.image = data.avatar;
        }

        await user.save();
        resolve({
          errCode: 0,
          message: 'Update user successfully',
        });
      } else {
        resolve('User is not available');
      }
    } catch (error) {
      reject(error);
    }
  });
};

let deleteUserService = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      await db.User.destroy({
        where: { id: userId },
      });
      resolve({
        errCode: 0,
        message: 'Delete user successfully',
      });
    } catch (error) {
      reject(error);
    }
  });
};

let getAllCodeService = (typeInput) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!typeInput) {
        resolve({
          errCode: 1,
          errMessage: 'Missing required parameters!',
        });
        return;
      } else {
        let res = {};
        let allcode = await db.Allcode.findAll({
          where: { type: typeInput },
        });
        res.errCode = 0;
        res.data = allcode;
        resolve(res);
      }
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  handleUserLogin: handleUserLogin,
  getAllUsers: getAllUsers,
  createNewUser: createNewUser,
  deleteUserService: deleteUserService,
  editUserService: editUserService,
  getAllCodeService: getAllCodeService,
};
