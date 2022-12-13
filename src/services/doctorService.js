import db from '../models/index.js';
require('dotenv').config();
import _ from 'lodash';

const MAX_NUMBER_SCHEDULE = process.env.MAX_NUMBER_SCHEDULE;

let getTopDoctorHome = (limit) => {
  return new Promise(async (resolve, reject) => {
    try {
      let users = await db.User.findAll({
        limit: limit,
        where: { roleId: 'R2' },

        order: [['createdAt', 'DESC']],
        attributes: {
          exclude: ['password'],
        },
        include: [
          {
            model: db.Allcode,
            as: 'positionData',
            attributes: ['valueEn', 'valueDe'],
          },
          {
            model: db.Allcode,
            as: 'genderData',
            attributes: ['valueEn', 'valueDe'],
          },
        ],
        raw: true,
        nest: true,
      });
      resolve({
        errCode: 0,
        data: users,
      });
    } catch (error) {
      reject(error);
    }
  });
};

let getAllDoctors = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let doctors = await db.User.findAll({
        where: { roleId: 'R2' },
        order: [['createdAt', 'DESC']],
        attributes: {
          exclude: ['password', 'image'],
        },
        include: [
          {
            model: db.Allcode,
            as: 'positionData',
            attributes: ['valueEn', 'valueDe'],
          },
          {
            model: db.Allcode,
            as: 'genderData',
            attributes: ['valueEn', 'valueDe'],
          },
        ],
        raw: true,
        nest: true,
      });
      resolve({
        errCode: 0,
        data: doctors,
      });
    } catch (error) {
      reject(error);
    }
  });
};

let saveDetailInfoDoctor = (inputData) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!inputData.doctorId || !inputData.contentHTML || !inputData.contentMarkdown || !inputData.action) {
        resolve({
          errCode: 1,
          errMessage: 'Missing required parameters!',
        });
      } else {
        if (inputData.action === 'CREATE') {
          await db.Markdown.create({
            contentHTML: inputData.contentHTML,
            contentMarkdown: inputData.contentMarkdown,
            doctorId: inputData.doctorId,
            description: inputData.description,
          });
        } else if (inputData.action === 'EDIT') {
          let doctorMarkdown = await db.Markdown.findOne({
            where: { doctorId: inputData.doctorId },
            raw: false,
          });
          if (doctorMarkdown) {
            doctorMarkdown.contentHTML = inputData.contentHTML;
            doctorMarkdown.contentMarkdown = inputData.contentMarkdown;
            doctorMarkdown.description = inputData.description;

            await doctorMarkdown.save();
          }
        }

        resolve({
          errCode: 0,
          message: 'Save detail info Doctor successfully',
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

let getDetailDoctorById = (inputId) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!inputId) {
        resolve({
          errCode: 1,
          errMessage: 'Missing required parameters!',
        });
      } else {
        let data = await db.User.findOne({
          where: { id: inputId },
          attributes: {
            exclude: ['password'],
          },
          include: [
            {
              model: db.Markdown,
              attributes: ['contentHTML', 'contentMarkdown', 'description'],
            },
            {
              model: db.Allcode,
              as: 'positionData',
              attributes: ['valueEn', 'valueDe'],
            },
          ],
          raw: false,
          nest: true,
        });
        if (data && data.image) {
          data.image = new Buffer(data.image, 'base64').toString('binary');
        }
        if (!data) data = {};

        resolve({
          errCode: 0,
          data: data,
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

let bulkCreateSchedule = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log('check data:', data);
      if (!data.arrSchedule) {
        resolve({
          errCode: 1,
          errMessage: 'Missing required parameters!',
        });
      } else {
        let schedule = data.arrSchedule;
        if (schedule && schedule.length > 0) {
          schedule = schedule.map((item) => {
            item.maxNumber = MAX_NUMBER_SCHEDULE;
            return item;
          });
        }
        // Get all existing schedule
        let existing = await db.Schedule.findAll({
          where: { doctorId: data.doctorId, date: data.date },
          attributes: ['timeType', 'date', 'doctorId', 'maxNumber'],
          raw: true,
        });
        // Convert date
        if (existing && existing.length > 0) {
          existing = existing.map((item) => {
            item.date = new Date(item.date).getTime();
            return item;
          });
        }

        // Compare  difference
        let toCreate = _.differenceWith(schedule, existing, (a, b) => {
          return a.timeType === b.timeType && a.date === b.date;
        });
        // Create new schedule
        if (toCreate && toCreate.length > 0) {
          await db.Schedule.bulkCreate(toCreate);
        }

        resolve({
          errCode: 0,
          message: 'Create schedule successfully',
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  getTopDoctorHome: getTopDoctorHome,
  getAllDoctors: getAllDoctors,
  saveDetailInfoDoctor: saveDetailInfoDoctor,
  getDetailDoctorById: getDetailDoctorById,
  bulkCreateSchedule: bulkCreateSchedule,
};
