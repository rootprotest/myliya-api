const multer = require('multer');
const { Storage } = require('@google-cloud/storage');
const path = require("path");

const storage = new Storage({
  keyFilename: path.join(__dirname, '..', 'file', 'email-js-1a09b-firebase-adminsdk-ensw9-93ddb0e54d.json'),
  projectId: 'email-js-1a09b',
});

const bucketName = 'email-js-1a09b.appspot.com';
const bucket = storage.bucket(bucketName);

const multerMemoryStorage = multer.memoryStorage();

const upload = multer({
  storage: multerMemoryStorage,
  limits: { fileSize: 25 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowed = ['image/png', 'image/jpg', 'image/jpeg', 'image/webp'];
    if (allowed.includes(file.mimetype)) {
      cb(null, true);
    } else {
      // Call cb exactly ONCE — either reject silently or pass an error, never both
      cb(new Error('Only .png, .jpg, .jpeg, and .webp formats are allowed!'));
    }
  },
}).fields([
  { name: 'images', maxCount: 6 },
  { name: 'imageFile', maxCount: 6 },
  { name: 'ImgDesktop', maxCount: 6 },
  { name: 'ImgMobile', maxCount: 6 },
  { name: 'file', maxCount: 1 }

]);

const uploadHandler = (req, res, next) => {
  upload(req, res, async (err) => {
    if (err) {
      console.error('Multer error:', err);
      return res.status(400).json({ success: false, error: 'Multer error', details: err.message });
    }

    const uploadPromises = [];
   if(req.files){
    Object.keys(req.files).forEach(fieldName => {
      req.files[fieldName].forEach(file => {
        console.log(`Processing file: ${file.originalname}`);
        console.log(`File size: ${file.size} bytes`);

        const folderName = 'muliya-dev/';
        const newFileName = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const destination = `${folderName}${newFileName}`;

        const uploadPromise = new Promise((resolve, reject) => {
          // Create a writable stream and upload the buffer
          const fileStream = bucket.file(destination).createWriteStream({
            metadata: {
              contentType: file.mimetype,
            },
          });

          // Handle stream events
          fileStream.on('error', (error) => {
            console.error('Error uploading to Google Cloud Storage:', error);
            reject(error);
          });

          fileStream.on('finish', () => {
            console.log('File upload complete.');
            const publicUrl = `https://storage.googleapis.com/${bucketName}/${destination}`;
            req.fileUrls = req.fileUrls || {};
            req.fileUrls[fieldName] = req.fileUrls[fieldName] || [];
            req.fileUrls[fieldName].push(publicUrl);
            resolve();
          });

          // Pipe the buffer to the stream
          fileStream.end(file.buffer);
        });

        uploadPromises.push(uploadPromise);
      });
    });
   }
   

    // Wait for all uploads to complete
    try {
      await Promise.all(uploadPromises);
      console.log('All files uploaded successfully.');
      next();
    } catch (error) {
      console.error('File upload error:', error);
      res.status(500).json({ error });
    }
  });
};

module.exports = { uploadHandler };


