require('../controllers/settings');
const nodemailer = require('nodemailer');

const mailer = {
  inboxGmailRegist: (email, codeVerify) => {
    try {
      const inboxGmail = `<div style="background:#EDEEF0;padding:16px;font-family:'helvetica','arial',sans-serif;color:#002735;">
  
      <!-- Logo Scola -->
      <div style="margin:0 auto;text-align:center;"> 
        <img width="140" src="https://sanslinedev.tech/assets/images/logo4.png">
      </div>
      
      <!-- Card -->
      <div style="background-color:#fff;border-radius:8px;margin: 20px auto;padding:32px;max-width:540px;text-align:center;">
        
        <!-- School Name -->
        <div style="display:block;border-bottom:1px solid #dadada;margin-left:-32px;margin-right:-32px;padding-bottom:20px;margin-top:-12px;">
          <div style="font-weight:600;font-size:15px;">${global.NAME} Rest Api</div>
        </div>
        
            <!-- Image Illustration -->
        <img src="https://sanslinedev.tech/assets/img/avatars/mail-check.png" style="width:36%;margin:0 auto;display:block;margin-bottom:10px;">
        
        <!-- Welcome Text -->
        <h2 style="font-weight:600;margin-top:0;margin-bottom:10px;color:#002735;">Verifikasi email anda!</h2>
        
        <!-- Deskripsi -->
        <p style="margin-top:0;margin-bottom:18px;font-size:17px;line-height: 1.4;">Data permintaan verifikasi email anda telah berhasil kami terima. Verifikasi email anda dengan mengklik tautan di bawah ini:</p>
        
        <!-- Verifikasi Link -->
        <a href="${codeVerify}" style="background:#0073e0;padding:16px 42px;display:inline-block;border-radius: 8px;color:#ffffff;text-decoration:none;font-size:16px;border-bottom:4px solid #004B93;margin-bottom: 16px;margin-top:8px;">Verifikasi Email</a>
    
        <!-- Footer -->
        <div style="display:block;padding-top:24px;border-top:1px solid #dadada;margin-top: 18px;">
          <a href="https://api.whatsapp.com/send?phone=62852218700162" style="color:#888;text-decoration:none;font-size:13px;">Whatsapp</a>
          <div style="font-size: 12px;color: #aaa;display:block;margin-top:4px;">
            �2023 ${global.NAME} Rest Api. All Right Reserved
          </div>
        </div>   
      `;

      let transporter = nodemailer.createTransport({
        service: 'gmail',
        host: 'smpt.gmail.com',
        port: 587,
        secure: false,
        requireTLS: true,
        auth: {
          user: my_email,
          pass: my_email_password,
        },
      });

      let mailOptions = {
        from: '"Sansline" <no-reply@gmail.com>',
        to: email,
        subject: 'Verify Email - Sansline Api',
        html: inboxGmail,
      };

      transporter.sendMail(mailOptions, (err) => {
        if (err) { console.log(err); }
      });
    } catch (error) { console.log(error); }
  },
};

module.exports = mailer;