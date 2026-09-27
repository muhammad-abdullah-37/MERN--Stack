// const File = require('../models/FileUpload.js');
const  localFileUpload = async (req,res) => {
    try {
        // fetching file from the req 
        const file = req.files.file
        let path = __dirname + '/files/' + Date.now() + `.${file.name.split('.')[1]}`;
        file.mv(path)
        res.send({
            success : true,
            message : 'Local File Uploaded Successfully'
        })
    } catch (error) {
        console.log(`Error in Local File Uploading : ${error}`);
        res.send(`Error in Local File Uploading : ${error}`)
    }
}

module.exports = localFileUpload;