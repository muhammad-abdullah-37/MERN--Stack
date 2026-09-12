const validator = require('validator');

function validateUser(data) {
    // Mandatory fields validation
    const mandatoryFields = ['firstName','emailId','age','password']
    const isAllowed = mandatoryFields.every((field) => Object.keys(data).includes(field));
    if (!isAllowed) {
        throw new Error('Field Missing')
    }
    // First Name validation 
    if (!(data.firstName.length >=3 && data.firstName.length <= 20)) {
        throw new Error('First Name should have at least 3 and at most 20 characters')
    }
    // Email validation
    if (!(validator.isEmail(data.emailId))) {
        throw new Error('Invalid Email')
    }
    // Age validation
    if (!(data.age >= 14)) {
        throw new Error('Minimum Age requirement is 14')
    }
    // Password validation
    if (!(validator.isStrongPassword(data.password))) {
        throw new Error('Weak Password')
    }
}

module.exports = validateUser;