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
           username,
           password, 
           confirmPassword,
           fullname,
           email,
           category,
       } = req.body;
       console.log(req.body, '.............')
       if(username.trim() === '' || fullname.trim() === '' || password.trim() === '' || confirmPassword.trim() === '' 
       || email.trim() === '' || category.trim() === '') {
           return res.status(400).json({
               message: 'please fill in the field(s)'
           })
       } 
       if(password !== confirmPassword) {
        return res.status(400).json({
            message: 'password does not match'
        })
       }
       Contacts.create({
           username, fullname, email, category, password: hashSync(password, 10)
       }).then((newUser) => {
           const user = {
               fullname: newUser.fullname,
               email: newUser.email,
               category: newUser.category
           }
           return res.status(201).json({
               message: 'signed up successfully',
               user
               
           })
       }).catch((error) => {
           return res.status(400).json({
               message: error.message
           })
       })

   } 

} 

export default ContactController;