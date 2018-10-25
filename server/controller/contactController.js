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
           fullname,
           email,
           category,
       } = req.body;
     
      return Contacts.create({
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
         if(contacts.length === 0 ) {
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
        });
   });
   };

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
          })
      })
  }

  static updateContact(req, res) {
    const {
        username,
        password,
        fullname,
        email,
        category,
    } = req.body;

    const { id } = req.params;
    Contacts.findOne({
        where: {
            id,
        }
    }).then(contact => {
        if(!contact) {
            return res.status(404).json({
                message: 'contact not found'
            })
        }
        contact.update({
            username, fullname, email, category, password: hashSync(password, 10)
        }).then((updatedUser) => {
            const user = {
                id: updatedUser.id,
                fullname: updatedUser.fullname,
                email: updatedUser.email,
                category: updatedUser.category
            }
            return res.status(200).json({
                message: 'contact updated successfully',
                user
            })
        }).catch((error) => {
            return res.status(400).json({
                message: error.message
            })
        });
    })}

    static singleContact(req, res) {
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
            const user = {
                id: contact.id,
                fullname: contact.fullname,
                email: contact.email,
                category: contact.category
            }
            return res.status(200).json({
                message: 'contact found successfully',
                user
            });
        });
    }
}

export default ContactController;