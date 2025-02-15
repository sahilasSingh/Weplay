const express = require('express');
const { createTweet, getUserTweets, updateTweet, deleteTweet } = require('../controllers/tweet_controller');
const router = express.Router();
const {verifyJWT} = require('../middlewares/auth.middleware')

router.post('/',verifyJWT,createTweet);
router.get('/:userId',verifyJWT,getUserTweets);
router.patch('/:tweetId',verifyJWT,updateTweet);
router.delete('/:tweetId',verifyJWT,deleteTweet);

module.exports = router;