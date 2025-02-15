const {isValidObjectId} = require("mongoose");
const {asyncHandler} = require("../utils/asyncHandler");
const {ApiError} = require("../utils/ApiError");
const {ApiResponse} = require("../utils/ApiResponse");
const Tweet = require("../models/tweet_model");
const User = require("../models/user_model");


const createTweet = asyncHandler(async(req,res)=>{
    const {content} = req.body;

    if(!content){
        throw new ApiError(400,"content is required");
    }

    const tweet = await Tweet.create({
       content,
       owner: req.user?._id,
    })

    if(!tweet){
        throw new ApiError(500, "failed to create tweet please try again")
    }

    return res
    .status(200)
    .json(new ApiResponse(200, tweet,"Tweet Created Successfully"));
})


const getUserTweets = asyncHandler(async(req,res)=>{
    const {tweetId} = req.params;

    if(!isValidObjectId(tweetId)){
        throw new ApiError(400, "Invalid tweet id");
    }
    
}) 


const updateTweet = asyncHandler(async(req,res)=>{
    const {content} = req.body;
    const {tweetId} = req.params;

    if(!content){
        throw new ApiError(400, "content is required");
    }

    if(!isValidObjectId(tweetId)){
        throw new ApiError(400, "Invalid tweet id");
    }

    const tweet = await Tweet.findById(tweetId);

    if(!tweet){
        throw new ApiError(404,"Tweet not found");
    }

    if(tweet.owner?.toString() !== req.user?._id.toString()){
        throw new ApiError(400,"You are not authorized to update this tweet");
    }

    const newTweet = await Tweet.findByIdAndUpdate(tweetId,
     {
        $set:{
            content,
        }
     },
     {
        new: true,
     }
    )

    if(!newTweet){
        throw new ApiError(500,"Failed to update tweet please try again");
    }

    return res
    .status(200)
    .json(new ApiResponse(200, newTweet, "Tweet updated successfully"));
}) 


const deleteTweet = asyncHandler(async(req,res)=>{
    const {tweetId} = req.params;

    if(!isValidObjectId(tweetId)){
        throw new ApiError(400, "Invalid tweet id");
    }

    const tweet = await Tweet.findById(tweetId);

    if(!tweet){
        throw new ApiError(404,"Tweet not found");
    }

    if(tweet.owner?.toString() !== req.user?._id.toString()){
        throw new ApiError(400,"You are not authorized to update this tweet");
    }

    const deleteTweet = await Tweet.findByIdAndDelete(tweetId);

    if(!deleteTweet){
        throw new ApiError(500,"Failed to delete tweet please try again");
    }

    return res.status(200).json(new ApiResponse(200, deleteTweet, "Tweet deleted successfully"))
}) 



module.exports = {createTweet,getUserTweets,updateTweet,deleteTweet};