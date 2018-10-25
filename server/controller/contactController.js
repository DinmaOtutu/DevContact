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
               id: newUser.id,
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

   static getContacts(req, res) {
     Contacts.all().then((contacts) => {
         if(!contacts) {
             return res.status(404).json({
                 message: 'contacts not found'
             })
         }
         const allContacts = contacts.map(contact => ({
             id: contact.id,
             fullname: contact.fullname,
             email: contact.email,
             category: contact.category,

        }))
        return res.status(200).json({
            message: 'All contacts',
            allContacts
        })
   }).catch(error => {
       res.status(404).json({
           error: error.message
       })
   })
   }

  static deleteContact(req, res) {
      const { id } = req.params;
      Contacts.findOne({
          where: {
              id,
          }
      }).then((contact) => {
          if(!contact) {
              return res.status(404).json({
                  message: 'contact not found'
              })
          }
          contact.destroy().then(deletedContact => {
              return res.status(200).json({
                  message: 'contact successfully deleted'
              })
          }).catch((error) => {
              return res.status(400).json({
                  error: error.message
              })
          })
      })
  }
 }

export default ContactController;