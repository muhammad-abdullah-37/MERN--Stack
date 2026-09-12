const validator = require('validator');

function validateUsers (data) {
    // Mandatory Fields validation 
    const mandatoryFields = ['firstName','emailId','age','gender','password'];
    const isAllowed = mandatoryFields.every((field) => Object.keys(data).includes(field))
    if (!isAllowed) {
        throw new Error('Field Missing')
    }
    // First Name validation
    if (!(data.firstName.length >=3 && data.firstName.length <= 20)) {
        throw new Error('First name should have at least 3 and at most 20 characters')
    }
    // 
    if (!validator.isEmail(data.emailId)) {
        throw new Error('Invalid Email')
    }
    // age validation 
    if (!(data.age >=14)) {
        throw new Error('Minimum age requirement is 14')
    }
    // Password validation
    if (!(validator.isStrongPassword(data.password))) {
        throw new Error('Password is Weak')
    }

}

module.exports = validateUsers;