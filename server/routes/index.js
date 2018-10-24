import express from 'express';
import ContactController from '../controller/contactController';

const router = express.Router();

router.post('/users', ContactController.createContact);

export default router;
