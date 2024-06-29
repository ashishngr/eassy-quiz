const multer = require('multer'); 

const storage = multer.memoryStorage(); 

//Multer file filter

const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        cb(new Error('File type not supported'), false);
    }
};

// Multer upload instance
const upload = multer({ storage, fileFilter }); 

module.exports = upload;

