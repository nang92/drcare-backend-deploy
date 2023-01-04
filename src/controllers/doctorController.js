import doctorService from '../services/doctorService';

let getTopDoctorHome = async (req, res) => {
  let limit = req.query.limit;
  if (!limit) limit = 10;
  try {
    let response = await doctorService.getTopDoctorHome(+limit);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      errCode: 500,
      errMessage: 'Internal server error',
    });
  }
};

let getAllDoctors = async (req, res) => {
  try {
    let doctors = await doctorService.getAllDoctors();
    return res.status(200).json(doctors);
  } catch (error) {
    return res.status(500).json({
      errCode: 500,
      errMessage: 'Internal server error',
    });
  }
};

let postInfoDoctor = async (req, res) => {
  let data = req.body;
  try {
    let response = await doctorService.saveDetailInfoDoctor(data);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      errCode: 500,
      errMessage: 'Internal server error',
    });
  }
};

let getDetailDoctorById = async (req, res) => {
  let id = req.query.id;
  try {
    let info = await doctorService.getDetailDoctorById(id);
    return res.status(200).json(info);
  } catch (error) {
    return res.status(500).json({
      errCode: 500,
      errMessage: 'Internal server error',
    });
  }
};

let bulkCreateSchedule = async (req, res) => {
  try {
    let info = await doctorService.bulkCreateSchedule(req.body);
    return res.status(200).json(info);
  } catch (error) {
    console.log('check doctorController error:', error);
    return res.status(500).json({
      errCode: 500,
      errMessage: 'Internal server error',
    });
  }
};

let getScheduleDoctorByDate = async (req, res) => {
  let doctorId = req.query.doctorId;
  let date = req.query.date;
  try {
    let info = await doctorService.getScheduleDoctorByDate(doctorId, date);
    return res.status(200).json(info);
  } catch (error) {
    console.log('check doctorController error:', error);
    return res.status(500).json({
      errCode: 500,
      errMessage: 'Internal server error',
    });
  }
};

let getExtraInfoDoctorById = async (req, res) => {
  let doctorId = req.query.doctorId;
  try {
    let info = await doctorService.getExtraInfoDoctorById(doctorId);
    return res.status(200).json(info);
  } catch (error) {
    console.log('check doctorController error:', error);
    return res.status(500).json({
      errCode: 500,
      errMessage: 'Internal server error',
    });
  }
};

let getProfileDoctorById = async (req, res) => {
  let doctorId = req.query.doctorId;
  try {
    let info = await doctorService.getProfileDoctorById(doctorId);
    return res.status(200).json(info);
  } catch (error) {
    console.log('check doctorController error:', error);
    return res.status(500).json({
      errCode: 500,
      errMessage: 'Internal server error',
    });
  }
};

let getListPatientForDoctor = async (req, res) => {
  try {
    let info = await doctorService.getListPatientForDoctor(req.query.doctorId, req.query.date);
    return res.status(200).json(info);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      errCode: 500,
      errMessage: 'Internal server error',
    });
  }
};

let sendRemedy = async (req, res) => {
  try {
    let info = await doctorService.sendRemedy(req.body);
    return res.status(200).json(info);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      errCode: 500,
      errMessage: 'Internal server error',
    });
  }
};

module.exports = {
  getTopDoctorHome: getTopDoctorHome,
  getAllDoctors: getAllDoctors,
  postInfoDoctor: postInfoDoctor,
  getDetailDoctorById: getDetailDoctorById,
  bulkCreateSchedule: bulkCreateSchedule,
  getScheduleDoctorByDate: getScheduleDoctorByDate,
  getExtraInfoDoctorById: getExtraInfoDoctorById,
  getProfileDoctorById: getProfileDoctorById,
  getListPatientForDoctor: getListPatientForDoctor,
  sendRemedy: sendRemedy,
};
