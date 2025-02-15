const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config({path: './env/dev.env'});

const app = express();


app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}));


app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(express.static('public'));
app.use(cookieParser());


const userRouter = require('./routes/user_routes');
const videoRouter = require('./routes/video_routes');
const commentRouter = require('./routes/comment_routes');
const SubscriptionRouter = require('./routes/subscription_routes');
const likeRouter = require('./routes/like_routes');
const playlistRouter = require('./routes/playlist_routes');
const tweetRouter = require('./routes/tweet_routes');


//routes declaration
app.use("/api/v1/users",userRouter);
app.use("/api/v1/videos",videoRouter);
app.use("/api/v1/comments",commentRouter);
app.use("/api/v1/likes",likeRouter);
app.use("/api/v1/subscriptions",SubscriptionRouter);
app.use("/api/v1/playlists",playlistRouter);
app.use("/api/v1/tweets",tweetRouter);


module.exports = {app};