import { Request, Response } from 'express';
import axios from 'axios';
import FormData from 'form-data';

export const sendWhatsAppText = async (req: Request, res: Response): Promise<void> => {
  try {
    const { message, phone } = req.body;

    const response = await axios.post(`https://api.ultramsg.com/instance${process.env.ULTRAMSG_INSTANCE_ID}/messages/chat`, {
      token: process.env.ULTRAMSG_TOKEN,
      to: phone,
      body: message,
    });

    res.status(200).json({ sent: true, data: response.data });
  } catch (err) {
    console.error('❌ WhatsApp Text Send Failed:', err);
    res.status(500).json({ message: 'Failed to send text to WhatsApp' });
  }
};

export const sendWhatsAppFile = async (req: Request, res: Response): Promise<void> => {
  try {
    const { phone, caption } = req.body;
    const file = req.file;
    if (!file) {
      res.status(400).json({ message: 'No file uploaded' });
      return;
    }

    const form = new FormData();
    form.append('token', process.env.ULTRAMSG_TOKEN || '');
    form.append('to', phone);
    form.append('caption', caption);
    form.append('filename', file.originalname);
    form.append('document', file.buffer, {
      filename: file.originalname,
      contentType: file.mimetype,
    });

    const response = await axios.post(`https://api.ultramsg.com/instance${process.env.ULTRAMSG_INSTANCE_ID}/messages/document`, form, {
      headers: form.getHeaders(),
    });

    res.status(200).json({ sent: true, data: response.data });
  } catch (err) {
    console.error('❌ WhatsApp File Send Failed:', err);
    res.status(500).json({ message: 'Failed to send file to WhatsApp' });
  }
};
