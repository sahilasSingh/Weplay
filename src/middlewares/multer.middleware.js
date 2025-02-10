const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./public/temp")
    },
    filename: function (req, file, cb) {
      
      cb(null, file.originalname)
      
    }
  })

const upload = multer({storage});

// Export the upload instance
module.exports = {upload};