/**
 * @class Validator
 * @param id - number
 */
class Validator {
    static idChecker(req, res, next) {
        const { id } = req.params;
        const validId = /^[0-9]+$/;
        if (id) {
          if (!id.match(validId)) {
            return res.status(400).json({
              message: 'ID can only be a number',
              error: true
            });
          }
        }
        return next();
    }
   static inputValidator(req, res, next) {
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
    if(password.length <= 5) {
        return res.status(400).json({
            message: 'password cannot be less than 6 characters'
        });
    };
    if(password !== confirmPassword) {
     return res.status(400).json({
         message: 'password does not match'
     })
    }
    return next();
   } 

}

export default Validator;