import express from 'express';
import multer from 'multer';
import { sendWhatsAppText, sendWhatsAppFile } from '../controllers/whatsappController';

const router = express.Router();
const upload = multer(); // memory storage

router.post('/text', sendWhatsAppText);
router.post('/send', upload.single('file'), sendWhatsAppFile);

export default router;
