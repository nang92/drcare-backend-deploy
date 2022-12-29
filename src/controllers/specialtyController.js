import specialtyService from '../services/specialtyService.js';

let createSpecialty = async (req, res) => {
  try {
    let info = await specialtyService.createSpecialty(req.body);
    return res.status(200).json(info);
  } catch (error) {
    return res.status(500).json({
      errCode: 500,
      message: 'Internal server error',
    });
  }
};

let getAllSpecialties = async (req, res) => {
  try {
    let info = await specialtyService.getAllSpecialties();
    return res.status(200).json(info);
  } catch (error) {
    return res.status(500).json({
      errCode: 500,
      message: 'Internal server error',
    });
  }
};

module.exports = {
  createSpecialty: createSpecialty,
  getAllSpecialties: getAllSpecialties,
};
