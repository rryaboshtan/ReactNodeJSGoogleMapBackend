const multer = require('multer');

const storage = multer.diskStorage({
   // destination: (req, file, cb) => {
   //    cb(null, 'uploads');
   // },
   filename: (req, file, cb) => {
      let ext = file.originalname.substring(file.originalname.lastIndexOf('.'));

      cb(null, `${file.fieldname}-${Date.now()}${ext}`);
   },
});

const store = multer({ storage });

module.exports = store;
