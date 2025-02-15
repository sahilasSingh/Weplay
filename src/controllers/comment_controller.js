const mongoose = require("mongoose");
const {asyncHandler} = require("../utils/asyncHandler");
const {ApiError} = require("../utils/ApiError");
const {ApiResponse} = require("../utils/ApiResponse");
const Comment = require("../models/comment_model");
const Video = require("../models/video_model");


const getVideoComment = asyncHandler(async (req,res)=>{
    const {videoId} = req.params;
    const {page = 1, limit = 10} = req.query
})


const addComment = asyncHandler(async (req,res)=>{
    const {videoId} = req.params;
    const {content} = req.body;

    if(!content){
        throw new ApiError(400, "content is required");
    }

    const video = await Video.findById(videoId);

    if(!video){
        throw new ApiError(404,"video not found");
    }

    const comment = await Comment.create({
        content,
        video: videoId,
        owner: req.user?._id,
    })

    if(!comment){
        throw new ApiError(400, "failed to add comment please try again");
    }

    return res
    .status(200)
    .json(new ApiResponse(200,comment,"Comment Added Successfully"));
})


const updateComment = asyncHandler(async (req,res)=>{
    const {commentId} = req.params;
    const {content} = req.body;

    if(!content){
        throw new ApiError(400, "content is required");
    }

    const comment = await Comment.findById(commentId);

    if(!comment){
        throw new ApiError(404, "comment not found");
    }

    if (comment?.owner.toString() !== req.user?._id.toString()) {
        throw new ApiError(400, "Only comment owner can edit their comment");
    }
    
    const updatedComment = await Comment.findByIdAndUpdate(comment?._id,
        {
            $set:{
                content
            }
        },
        {
            new: true,
        }
    );

    if(!updatedComment){
        throw new ApiError(500, "failed to update comment please try again");
    }

    return res
    .status(200)
    .json(new ApiResponse(200, updatedComment,"comment updated successfully"));
})


const deleteComment = asyncHandler(async (req,res)=>{
    const {commentId} = req.params;

    const comment = await Comment.findById(commentId);
    
    if(!comment){
        throw new ApiError(404, "comment not found");
    }

    if(comment?.owner.toString() !== req.user?._id.toString()){
        throw new ApiError(400, "Only comment owner can delete their commnet");
    }

    const deletedComment = await Comment.findByIdAndDelete(commentId);

    if(!deletedComment){
        throw new ApiError(400, "failed to delete comment please try again");
    }

    // await Like.deleteMany({
    //     comment: commentId,
    //    // likedBy: req.user
    // });

    return res
    .status(200)
    .json(new ApiResponse(200, deletedComment, "comment deleted successfully"));
})


module.exports = {getVideoComment,addComment,updateComment,deleteComment};