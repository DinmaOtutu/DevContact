import express from 'express';
import ContactController from '../controller/contactController';

const router = express.Router();
const { createContact, getContacts } = ContactController;

router.post('/users', createContact);
router.get('/users', getContacts)

export default router;
