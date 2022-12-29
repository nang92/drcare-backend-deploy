require('dotenv').config();
import nodemailer from 'nodemailer';

let sendSimpleEmail = async (dataSend) => {
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_APP,
      pass: process.env.EMAIL_APP_PASSWORD,
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"DrCare " <leethang1102@gmail.com>', // sender address
    to: dataSend.receiverEmail, // list of receivers
    subject: 'Thông báo đặt lịch khám', // Subject line
    html: getBodyHTMLEmail(dataSend), // html body
  });
};

let getBodyHTMLEmail = (dataSend) => {
  let result = '';
  if (dataSend.language === 'de') {
    result = `
        <h3>Hallo ${dataSend.patientName}!, </h3>
        <p>Wir haben Ihre Buchungsanfrage erhalten. Ihre Buchungsdaten sind wie folgt:</p>
        <div><b>Zeit:</b> ${dataSend.time}</div>
        <div><b>Arzt:</b> ${dataSend.doctorName}</div>

        <p>Bitte klicken Sie auf den untenstehenden Link, um Ihre Buchung zu bestätigen: <a href="${dataSend.verifyLink}">Buchung bestätigen</a></p>

        <p>Mit freundlichen Grüßen!</p>
        <p>DrCare</p>
        `;
  }
  if (dataSend.language === 'en') {
    result = `
        <h3>Hello ${dataSend.patientName}!, </h3>
        <p>We have received your booking request. Your booking details are as follows:</p>
        <div><b>Time:</b> ${dataSend.time}</div>
        <div><b>Doctor:</b> ${dataSend.doctorName}</div>

        <>Please click the link below to verify your booking: <a href="${dataSend.verifyLink}">Verify booking</a></p>

        <p>Best regards!</p>
        <p>DrCare</p>
        `;
  }
  return result;
};

module.exports = {
  sendSimpleEmail: sendSimpleEmail,
};
