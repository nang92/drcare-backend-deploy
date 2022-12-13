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
      message: 'Internal server error',
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
      message: 'Internal server error',
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
      message: 'Internal server error',
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
      message: 'Internal server error',
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
      message: 'Internal server error',
    });
  }
};

module.exports = {
  getTopDoctorHome: getTopDoctorHome,
  getAllDoctors: getAllDoctors,
  postInfoDoctor: postInfoDoctor,
  getDetailDoctorById: getDetailDoctorById,
  bulkCreateSchedule: bulkCreateSchedule,
};
