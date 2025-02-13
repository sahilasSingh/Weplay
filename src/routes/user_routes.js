const express = require('express');
const router = express.Router();
const {
    registerUser,
    loginUser,
    logoutUser,
    refreshAccessToken,
    changeCurrentPassword,
    getCurrentUser, 
    updateAccountDetails, 
    updateAvatar, 
    updateCoverImage, 
    getUserChannelProfile, 
    getWatchHistory} = require('../controllers/user_controller');
const upload = require('../middlewares/multer.middleware');
const {verifyJWT} = require('../middlewares/auth.middleware');

router.post("/register",upload.fields([
    {
        name: "avatar",
        maxCount: 1
    }, 
    {
        name: "coverImage",
        maxCount: 1
    }
]),registerUser);


router.post("/login",loginUser)
  
//secure routes
router.post("/logout",verifyJWT,logoutUser)
router.post("/refresh-token",refreshAccessToken)
router.post("/change-password",verifyJWT,changeCurrentPassword)
router.get("/current-user",verifyJWT,getCurrentUser)
router.patch("/update-account",verifyJWT,updateAccountDetails)
router.patch("/update-avatar",verifyJWT,upload.single("avatar"),updateAvatar)
router.patch("/cover-image",verifyJWT,upload.single("coverImage"),updateCoverImage)
router.get("/c/:username",verifyJWT,getUserChannelProfile)
router.get("/history",verifyJWT,getWatchHistory)

    




// router.route("/avatar").patch(verifyJWT, upload.single("avatar"), updateUserAvatar)
// router.route("/cover-image").patch(verifyJWT, upload.single("coverImage"), updateUserCoverImage)
// router.route("/login").post(logInUser);

module.exports = router;