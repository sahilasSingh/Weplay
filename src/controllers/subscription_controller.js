const {isValidObjectId} = require("mongoose");
const {asyncHandler} = require("../utils/asyncHandler");
const {ApiError} = require("../utils/ApiError");
const {ApiResponse} = require("../utils/ApiResponse");
const Subscription = require("../models/subscription_model");
const User = require("../models/user_model");


const toggleSubscription = asyncHandler(async (req,res)=>{
   const {channelId} = req.params;
})


const getUserChannelSubscribers = asyncHandler(async(req,res)=>{
    const {channelId} = req.params;
})


const getSubscribedChannels = asyncHandler(async(req,res)=>{
   const {subscriberId} = req.params;
})

module.exports = {toggleSubscription,getUserChannelSubscribers,getSubscribedChannels};