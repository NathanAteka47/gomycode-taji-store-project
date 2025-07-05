import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

interface SendReceiptProps {
  to: string;
  order: any;
}

export default async function sendReceiptEmail({ to, order }: SendReceiptProps) {
  const items = order.orderItems
    .map((item: any) => `<li>${item.name} x ${item.qty} @ Ksh ${item.price}</li>`)
    .join('');

  const htmlContent = `
    <h2>Thank you for your order!</h2>
    <p>Order ID: <strong>${order._id}</strong></p>
    <p><strong>Total:</strong> Ksh ${order.totalPrice}</p>
    <ul>${items}</ul>
    <p><strong>Shipping to:</strong> ${order.shippingInfo.fullName}, ${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.phone}</p>
  `;

  await transporter.sendMail({
    from: `Taji Store <${process.env.EMAIL_USER}>`,
    to,
    subject: '🧾 Your Taji Store Receipt',
    html: htmlContent,
  });
}
