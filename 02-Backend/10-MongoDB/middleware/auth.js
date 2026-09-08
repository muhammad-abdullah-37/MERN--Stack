 const Auth = (req,res,next) => {
     // Authentication for admin
    // Dummy Code and this topic will be done in the authenication and authorization part in upcoming parts
    const token = 'abc123'
    const access = token === 'abc123' ? (1) : (0);
    if (!access) {
        res.status(401).send('Access Denied')
    }
    else {
        next()
    }
}

module.exports = {
    Auth
}