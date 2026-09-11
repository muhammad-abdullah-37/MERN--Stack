const validator = require('validator');
function validateUser (data) {
            // mandatory fields validation
            const mandatoryFields = ['firstName', 'emailId', 'password', 'age'];
            const isAllowed = mandatoryFields.every((field) => Object.keys(data).includes(field));
            if (!isAllowed){
                throw new Error ('Fields missing');
            }
            // First Name validation
            if (!(data.firstName.length >= 3 && data.firstName.length <= 20)) {
                throw new Error('Name have at least 3 characters and at most 20 characters')
            }
            // password validation 
            if (!validator.isStrongPassword(data.password)) {
                throw new Error('Weak Password')
            }
            // email validation 
            if (!validator.isEmail(data.emailId)) {
                throw new Error('Invaid Email : ')
            }
            // AGE Validation
            if (!data.age > 14 ) {
                throw new Error('Minmum age Requirement is 14')
            }
}

module.exports = validateUser;