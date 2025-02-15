const {isValidObjectId} = require("mongoose");
const {asyncHandler} = require("../utils/asyncHandler");
const {ApiError} = require("../utils/ApiError");
const {ApiResponse} = require("../utils/ApiResponse");
const Like = require("../models/like_model");


const toggleVideoLike = asyncHandler(async (req,res)=>{
    const {videoId} = req.params;
})


const toggleCommentLike = asyncHandler(async (req,res)=>{
    const {commentId} = req.params;
})


const toggleTweetLike = asyncHandler(async (req,res)=>{
    const {tweetId} = req.params;
})


const getLikedVideos = asyncHandler(async (req,res)=>{

})


module.exports = {toggleVideoLike,toggleCommentLike,toggleTweetLike,getLikedVideos};