import patientService from '../services/patientService.js';

let postBookAppoinment = async (req, res) => {
  try {
    let info = await patientService.postBookAppoinment(req.body);
    return res.status(200).json(info);
  } catch (error) {
    return res.status(500).json({
      errCode: 500,
      message: 'Internal server error',
    });
  }
};

let postVerifyBookAppoinment = async (req, res) => {
  try {
    let info = await patientService.postVerifyBookAppoinment(req.body);
    return res.status(200).json(info);
  } catch (error) {
    return res.status(500).json({
      errCode: 500,
      message: 'Internal server error',
    });
  }
};

module.exports = {
  postBookAppoinment: postBookAppoinment,
  postVerifyBookAppoinment: postVerifyBookAppoinment,
};
