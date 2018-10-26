/**
 * @class Validator
 * @param id - number
 */
class Validator {
    /**
     * class for checking if id is a number
     */
    static idChecker(req, res, next) {
        // destructure req params
        const { id } = req.params;
        // regex to validate id
        const validId = /^[0-9]+$/;
        if (id) {
            // check if id matches the validId
          if (!id.match(validId)) {
            return res.status(400).json({
              message: 'ID can only be a number',
              error: true
            });
          }
        }
        return next();
    }

    /**
     * class for form validation
     */
   static inputValidator(req, res, next) {
       // destructure req params
        const {
            username,
            password, 
            confirmPassword,
            fullname,
            email,
            category,
        } = req.body;
    
        // check if fields are empty
        if(username.trim() === '' || fullname.trim() === '' || password.trim() === '' || confirmPassword.trim() === '' 
        || email.trim() === '' || category.trim() === '') {
            return res.status(400).json({
                message: 'please fill in the field(s)'
            })
        }
        // check if password length is less than 6
        if(password.length <= 5) {
            return res.status(400).json({
                message: 'password cannot be less than 6 characters'
            });
        };
        // check if both password fields are the same
        if(password !== confirmPassword) {
            return res.status(400).json({
                message: 'password does not match'
            })
        }
        return next();
    } 

}

export default Validator;