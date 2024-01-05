const { storage } = require('../config/firebase');
const { ref, uploadBytes, getDownloadURL } = require('firebase/storage');

// Function to upload an image to Firebase Storage
const uploadToFbStorage = async (type,productId, folder, file) => {
    
    const storageRef = ref(storage, `${type}/${productId}/${folder}/${file.originalname}`);
    await uploadBytes(storageRef, file.buffer);
    return getDownloadURL(storageRef);
};
module.exports = { uploadToFbStorage };
 