const express = require('express');
const router = express.Router();
const {verifyJWT} = require('../middlewares/auth.middleware');
const { createPlaylist, updatePlaylist, addVideoToPlayList, removeVideoFromPlayList, deletePlaylist } = require('../controllers/playList_controller');

router.post('/',verifyJWT,createPlaylist);
// router.get('/',verifyJWT,getUserPlaylists);
// router.get('/',verifyJWT,getPlaylistById);
router.patch('/:playlistId',verifyJWT,updatePlaylist);
router.delete('/:playlistId',verifyJWT,deletePlaylist);
router.patch('/add/:videoId/:playlistId',verifyJWT,addVideoToPlayList);
router.patch('/remove/:videoId/:playlistId',verifyJWT,removeVideoFromPlayList);

module.exports = router;