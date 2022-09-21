const multer = require('multer');

exports.uploadFile = (imageFile) => {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads');
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname.replace(/\s/g, ''));
    },
  });

  const fileFilter = function (req, file, cb) {
    if (file.fieldname === imageFile) {
      if (!file.originalname.match(/\.(JPG|png|PNG)$/)) {
        req.fileValidationError = {
          message: 'Only image files are allowed',
        };
        return cb(new Error('Only image file are allowed'), false);
      }
    }
    cb(null, true);
  };

  //size file
  const sizeInMB = 10;
  const maxSize = sizeInMB * 100 * 100;

  const upload = multer({
    storage,
    fileFilter,
    limits: {
      fileSize: maxSize,
    },
  }).single(imageFile);

  return (req, res, next) => {
    upload(req, res, function (err) {
      if (req.fileValidationError) {
        return res.status(400).send(req.fileValidationError);
      }

      if (!req.file && !err) {
        return res.status(400).send({
          message: 'please select a file to upload',
        });
      }

      if (err) {
        if (err.code === 'LIMIT_FILE_SIZE') {
          return res.status(400).send({
            message: 'Max size file 100 KB',
          });
        }

        return res.status(400).send(err);
      }

      return next();
    });
  };
};
