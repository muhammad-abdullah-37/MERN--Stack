const express = require('express');
const main = require('./config/database');
const app = express();
const PORT = process.env.PORT || 5000;
const connectCloudinary = require('./config/cloudinary')
const fileUpload = require('express-fileupload');
const upload = require('./routes/fileUpload.js')


// Data parsing using middleware
app.use(express.json());
app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}))

// MongoDB Connection
main()
.then(()=> {
    app.listen(PORT, () => {
    console.log(`App is listening at the PORT : ${PORT}`);
})
})
.catch((error) => {
    console.log(`Error in DB connection : ${error}`);
})

// Cloudinary Connection
 connectCloudinary()
.then(() => {
    console.log(`Cloudinary Connected Successfully`);
})
.catch((error) => {
    console.log(`Error in Cloudinary Connection : ${error}`);
});


// Routes
app.use('/api/v1/upload',upload);


