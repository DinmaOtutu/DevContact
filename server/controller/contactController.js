 import bcrypt, { hashSync } from 'bcrypt'
 import models from '../models/index';

 const {  Contacts } = models;
/**
 * class for developers contacts
 * 
 */
class ContactController {
    /**
     * class for creating the contact details
     */
   static createContact(req, res) {
       const {
           id,
           username,
           password, 
           confirmPassword,
           fullname,
           email,
           category,
           bio,

       } = req.body;
       console.log(req.body, '.............')
       if(username.trim() === '' || fullname.trim() === '' || password.trim() === '' || confirmPassword.trim() === '' 
       || email.trim() === '' || category.trim() === '' || bio.trim() === '') {
           return res.status(400).json({
               message: 'please fill in the field(s)'
           })
       } 
       if(password !== confirmPassword) {
        return res.status(400).json({
            message: 'password does not match'
        })
       }
       return res.status(201).json({
           message: 'you have created a profile'
       })
       Contacts.create({
           username, firstname, lastname, email, category,bio
       })

   } 

} 

export default ContactController;