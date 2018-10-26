import express from 'express';
import ContactController from '../controller/contactController';
import Validator from '../middlewares/validator';

const router = express.Router();

// destructure controllers and middlewares
const { singleContact, createContact, getContacts, deleteContact, updateContact } = ContactController;
const { idChecker, inputValidator } = Validator;

router.get('/users/:id', idChecker, singleContact);
router.post('/users', inputValidator, createContact);
router.get('/users', getContacts);
router.delete('/users/:id', idChecker, deleteContact);
router.put('/users/:id', idChecker, updateContact);

export default router;
