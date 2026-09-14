const validator  = require('validator');
function authUser (data) {
    // Mandatory Fields validation;
    const mandatoryFields = ['firstName','emailId','password'];
    console.log(data);
    if (!(mandatoryFields.every((field) => Object.keys(data).includes(field)))) {
        throw new Error('Field Missing')
    };
    // First Name validation
    if(!(data.firstName.length >=3)){
        throw new Error('First name should have at least 3 characters');
    }
    if(!(data.firstName.length <= 20)){
        throw new Error('First name should have at most 20 characters');
    }
    // Emial id validation
    if (!(validator.isEmail(data.emailId))) {
        throw new Error('Invalid Email ID: ')
    }
    // age validation
    if (!(data.age >= 14)) {
        throw new Error('Minimum age requirement is 14')
    }
    // City validation 
    if (!(data.city.length <= 30)) {
        throw new Error('City should have at most 30 characters')
    }
    // Password validation
    if (!(validator.isStrongPassword(data.password))) {
        throw new Error('Weak Password')
    }
}

module.exports = authUser;