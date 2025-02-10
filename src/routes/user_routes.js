const express = require('express');
const router = express.Router();
const {registerUser,loginUser,logoutUser,refreshAccessToken} = require('../controllers/user_controller');
const {upload} = require('../middlewares/multer.middleware');
const {verifyJWT} = require('../middlewares/auth.middleware');

router.post("/register",upload.fields([
    // {
    //     name: "avatar",
    //     maxCount: 1
    // }, 
    {
        name: "coverImage",
        maxCount: 1
    }
]),registerUser);


router.post("/login",loginUser)
  
//secure routes
router.post("/logout",verifyJWT,logoutUser)
router.post("/refresh-token",refreshAccessToken)
    




// router.route("/avatar").patch(verifyJWT, upload.single("avatar"), updateUserAvatar)
// router.route("/cover-image").patch(verifyJWT, upload.single("coverImage"), updateUserCoverImage)
// router.route("/login").post(logInUser);

module.exports = router;