const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",

  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const sendOtpEmail = async (email, otp) => {
  const mailOptions = {
    from: `"Jenny Notes" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Jenny Notes - Password Reset OTP",

    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 30px;">
        
        <h2 style="color: #4f46e5;">
          Jenny Notes
        </h2>

        <p>
          You requested to reset your password.
        </p>

        <p>
          Your password reset OTP is:
        </p>

        <div style="
          background: #eef2ff;
          padding: 20px;
          text-align: center;
          border-radius: 10px;
          margin: 20px 0;
        ">
          <strong style="
            font-size: 32px;
            letter-spacing: 8px;
            color: #4f46e5;
          ">
            ${otp}
          </strong>
        </div>

        <p>
          This OTP will expire in <strong>10 minutes</strong>.
        </p>

        <p>
          If you did not request a password reset, you can safely ignore this email.
        </p>

        <p style="color: #64748b;">
          © Jenny Notes
        </p>

      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = {
  sendOtpEmail,
};