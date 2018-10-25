import express from 'express';
import ContactController from '../controller/contactController';

const router = express.Router();
const { createContact, getContacts, deleteContact, updateContact } = ContactController;

router.post('/users', createContact);
router.get('/users', getContacts)
router.delete('/users/:id', deleteContact)
router.put('/users/:id', updateContact)

export default router;
