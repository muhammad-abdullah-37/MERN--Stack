const validator = require('validator');


function userAuth(data) {
    // Mandatory Fields validation
    const mandatoryFields = ['firstName','emailId','password'];
    if (!(mandatoryFields.every((field) => Object.keys(data).includes(field)))) {
        throw new Error('Field Missing') 
    }
    // First Name validation
    if (!(data.firstName.length >= 3)) {
        throw new Error('First Name should have at least 3 characters')
    }
     if (!(data.firstName.length <=20)) {
        throw new Error('First Name should have at most 20 characters')
    }
    // Last Name validation
    if (!(data.lastName.length >= 3)) {
        throw new Error('Last Name should have at least 3 characters')
    }
    if (!(data.lastName.length <= 20)) {
        throw new Error('Last Name should have at most 20 characters')
    }
    // Email validation
    if (!(validator.isEmail(data.emailId))) {
        throw new Error('Invalid Email ID')
    }
    // Password validation
    if (!(validator.isStrongPassword(data.password))) {
        throw new Error('Weak Password')
    }

}


module.exports = userAuth;