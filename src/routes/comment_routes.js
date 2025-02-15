const express = require('express');
const { addComment, getVideoComment, updateComment, deleteComment } = require('../controllers/comment_controller');
const router = express.Router();
const {verifyJWT} = require('../middlewares/auth.middleware');



router.post('/:videoId',verifyJWT,addComment);
router.get('/:videoId',verifyJWT,getVideoComment);
router.patch('/:commentId',verifyJWT,updateComment);
router.delete('/:commentId',verifyJWT,deleteComment);


module.exports = router;