const nodemailer = require("nodemailer");

class NotificationService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.Email,
        pass: process.env.Key,
      },
    });
  }

  async sendEmail({ email, subject, message }) {
    const mailOptions = {
      from: email,
      to: `${process.env.MyEmail}`,
      subject: ` ${subject}`,
      text: `
        Email: ${email}
        Message: ${message}`,
    };

    try {
      const info = await this.transporter.sendMail(mailOptions);
      console.log("Email sent: " + info.response);
      return { success: true, message: "Email sent successfully" };
    } catch (error) {
      console.error("Error sending email: " + error);
      return { success: false, error: "Error sending email" };
    }
  }
}

module.exports = NotificationService;
