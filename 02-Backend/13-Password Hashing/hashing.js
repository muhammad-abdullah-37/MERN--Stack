const bcrypt = require('bcrypt');

const password = '123456789'

// Hashcode + Salt

async function  passwordHashingWithRound() {
    // Generating Hashcode with the Round parameter
    const hashedPassword = await bcrypt.hash(password,10);
    console.log('Hashed Password with Round   :- ', hashedPassword);


    // Comparing the password and Hashed Password
    const answer = await bcrypt.compare(password,hashedPassword);
    console.log('Answer : ', answer);
}
passwordHashingWithRound();
async function passwordHashingWithSalt() {
    // Generating the salt manually
    const salt = await bcrypt.genSalt(10);
    // Generating the hash code using th salt and password; 
    const hashedPassword =  await bcrypt.hash(password,salt)
    console.log('Hashed password with Salt    :- ',hashedPassword);
    console.log('Salt for the Hashing         :- ' ,salt);

}

passwordHashingWithSalt();
