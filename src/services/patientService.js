import db from '../models/index.js';
require('dotenv').config();

let postBookAppoinment = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.email || !data.doctorId || !data.date || !data.timeType) {
        resolve({
          errCode: 1,
          errMessage: 'Missing required parameters!',
        });
      } else {
        //upsert patient
        let user = await db.User.findOrCreate({
          where: { email: data.email },
          defaults: {
            email: data.email,
            roleId: 'R3',
          },
        });

        if (user && user[0]) {
          await db.Booking.findOrCreate({
            where: {
              patientId: user[0].id,
            },
            defaults: {
              statusId: 'B1',
              doctorId: data.doctorId,
              patientId: user[0].id,
              date: data.date,
              timeType: data.timeType,
            },
          });
        }
        resolve({
          errCode: 0,
          errMessage: 'Save booking successfully!',
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  postBookAppoinment: postBookAppoinment,
};
