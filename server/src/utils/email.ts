import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'marlin4off7@gmail.com',     // Replace with your email
    pass: 'Mal12345', // Use App Password if using Gmail
  },
});

export const sendReceiptEmail = async (to: string, subject: string, htmlContent: string) => {
  await transporter.sendMail({
    from: '"Taji Eats" <tajieats@tajithreeinone.com>',
    to,
    subject,
    html: htmlContent,
  });
};
