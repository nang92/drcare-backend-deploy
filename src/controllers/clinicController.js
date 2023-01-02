import clinicService from '../services/clinicService.js';

let createClinic = async (req, res) => {
  try {
    let info = await clinicService.createClinic(req.body);
    return res.status(200).json(info);
  } catch (error) {
    return res.status(500).json({
      errCode: 500,
      message: 'Internal server error',
    });
  }
};

let getAllClinic = async (req, res) => {
  try {
    let info = await clinicService.getAllClinic();
    return res.status(200).json(info);
  } catch (error) {
    return res.status(500).json({
      errCode: 500,
      message: 'Internal server error',
    });
  }
};

let getDetailClinicById = async (req, res) => {
  try {
    let info = await clinicService.getDetailClinicById(req.query.id);
    return res.status(200).json(info);
  } catch (error) {
    return res.status(500).json({
      errCode: 500,
      message: 'Internal server error',
    });
  }
};

module.exports = {
  createClinic: createClinic,
  getAllClinic: getAllClinic,
  getDetailClinicById: getDetailClinicById,
};
