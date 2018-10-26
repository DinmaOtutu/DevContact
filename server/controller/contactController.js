 import bcrypt, { hashSync } from 'bcrypt'
 import models from '../models/index';

 const {  Contacts } = models;
/**
 * class for developers contacts
 * 
 */
class ContactController {
    /**
     * class for creating new contact details
     */
   static createContact(req, res) {
       // destructure input fields
       const {
           username,
           password, 
           fullname,
           email,
           category,
       } = req.body;
     
      return Contacts.create({
           username, fullname, email, category,
           password: hashSync(password, 10) // hash password
       }).then((newUser) => {
           const user = {
               id: newUser.id,
               fullname: newUser.fullname,
               email: newUser.email,
               category: newUser.category
           }
           // response on success
            return res.status(201).json({
               message: 'signed up successfully',
               user
               
           })
       })
       // catch error and return to user
       .catch((error) => {
           return res.status(400).json({
               message: error.message
           })
       })
    }

    /**
     * class for getting a contact
     */
   static getContacts(req, res) {
     Contacts
        // find all contacts
        .all().then((contacts) => {
            // if no contact
            if(contacts.length === 0 ) {
                return res.status(404).json({
                    message: 'contacts not found'
                })
            }
            // loop through contacts
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

   /**
     * class for creating new contact details
     */
  static deleteContact(req, res) {
      // destrucutre req params
      const { id } = req.params;
      Contacts
        // find one user
        .findOne({
            where: {
                id,
            }
        }).then((contact) => {
            // no contact found
            if(!contact) {
                return res.status(404).json({
                    message: 'contact not found'
                })
            }
            contact
                // delete contact
                .destroy().then(deletedContact => {
                    return res.status(200).json({
                        message: 'contact successfully deleted'
                    })
                })
        })
  }

  /**
     * class for creating new contact details
     */
  static updateContact(req, res) {
      // destructure inputs
    const {
        username,
        password,
        fullname,
        email,
        category,
    } = req.body;

    // destructure req params
    const { id } = req.params;
    return Contacts
        // find one contact
        .findOne({
            where: {
                id,
            }
        })
        // on success
        .then(contact => {
            // no contact found
            if(!contact) {
                return res.status(404).json({
                    message: 'contact not found'
                })
            }
            contact
                // update contact
                .update({
                    username, fullname, email, category, password: hashSync(password, 10)
                }).then((updatedUser) => {
                    const user = {
                        id: updatedUser.id,
                        fullname: updatedUser.fullname,
                        email: updatedUser.email,
                        category: updatedUser.category
                    }
                    // return contact on success
                    return res.status(200).json({
                        message: 'contact updated successfully',
                        user
                    })
                })
                // catch error
                .catch((error) => {
                    return res.status(400).json({
                        message: error.message
                    })
                });
    })}

    /**
     * class for getting one contact
     */
    static singleContact(req, res) {
        const { id } = req.params;
        Contacts
            // find one user
            .findOne({
                where: {
                    id,
                }
        })
            // on success
            .then((contact) => {
                // no contact found
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
                // return user
                return res.status(200).json({
                    message: 'contact found successfully',
                    user
                });
            });
    }
}

export default ContactController;