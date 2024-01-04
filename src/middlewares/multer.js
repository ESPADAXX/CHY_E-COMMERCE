const multer = require('multer');

// Multer configuration
const storageConfig = multer.memoryStorage();
const upload = multer({ storage: storageConfig });

const uploadMiddleware = upload.fields([{ name: 'thumbnail', maxCount: 1 }, { name: 'images', maxCount: 10 }]);

module.exports={uploadMiddleware}