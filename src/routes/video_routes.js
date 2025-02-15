const express = require('express');
const { getAllVideos,publishVideo, getVideoById, updateVideo, deleteVideo, togglePublishStatus } = require('../controllers/video_controller');
const router = express.Router();

const upload = require('../middlewares/multer.middleware')
const { verifyJWT } = require('../middlewares/auth.middleware');


router.get("/",verifyJWT,getAllVideos)
router.post("/publish-video",verifyJWT,upload.fields([
    {
      name:"videoFile",
      maxCount: 1
    },
    {
      name:"thumbnail",
      maxCount: 1
    }
]),publishVideo)

router.get("/",verifyJWT,getVideoById)
router.patch("/",verifyJWT,updateVideo)
router.delete("/",verifyJWT,deleteVideo)
router.patch("/",verifyJWT,togglePublishStatus)




module.exports = router;