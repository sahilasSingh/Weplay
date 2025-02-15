const {isValidObjectId} = require("mongoose");
const {asyncHandler} = require("../utils/asyncHandler");
const {ApiError} = require("../utils/ApiError");
const {ApiResponse} = require("../utils/ApiResponse");
const PlayList = require("../models/playlist_model");
const Video = require("../models/video_model")


const createPlaylist = asyncHandler(async(req,res)=>{
    const {name,description} = req.body;
    
    if(!name || !description){
        throw new ApiError(400, "name and description both are required");
    }

    const playlist = await PlayList.create({
        name,
        description,
        owner: req.user?._id
    })

    if(!playlist){
        throw new ApiError(500, "failed to create playlist");
    }

    return res
    .status(200)
    .json(new ApiResponse(200, playlist, "Playlist Created Successfully"));
})


const getUserPlaylists = asyncHandler(async(req,res)=>{
    const {userId} = req.params;
})


const getPlaylistById = asyncHandler(async(req,res)=>{
    const {playListId} = req.params;
})


const addVideoToPlayList = asyncHandler(async(req,res)=>{
    const {playlistId,videoId} = req.params;

    if(!isValidObjectId(playlistId) || !isValidObjectId(videoId)){
        throw new ApiError(400,"Invalid PlaylistId or VideoId")
    }

    const playlist = await PlayList.findById(playlistId);
    const video = await Video.findById(videoId);

    if(!playlist){
        throw new ApiError(404, "Playlist not found");
    }

    if(!video){
        throw new ApiError(404, "Video not found");
    }

    if ((playlist.owner?.toString() && video.owner?.toString()) !==
        req.user?._id.toString()
    ) {
        throw new ApiError(400, "only owner can add video to thier playlist");
    }

    const updatedPlaylist = await PlayList.findByIdAndUpdate(playlist?._id,
        {
            $addToSet:{
                videos: videoId,
            },
        },
        {
            new:true,
        }
    )

    return res
    .status(200)
    .json(new ApiResponse(200, updatedPlaylist, "Added Video to Playlist Successfully"));

})


const removeVideoFromPlayList = asyncHandler(async(req,res)=>{
    const {playlistId,videoId} = req.params;

    if(!isValidObjectId(playlistId) || !isValidObjectId(videoId)){
        throw new ApiError(400,"Invalid PlaylistId or VideoId")
    }

    const playlist = await PlayList.findById(playlistId);
    const video = await Video.findById(videoId);

    if(!playlist){
        throw new ApiError(404, "Playlist not found");
    }

    if(!video){
        throw new ApiError(404, "Video not found");
    }

    if ((playlist.owner?.toString() && video.owner?.toString()) !==
        req.user?._id.toString()
    ) {
        throw new ApiError(400, "only owner can add video to thier playlist");
    }

    const updatedPlaylist = await PlayList.findByIdAndUpdate(playlist?._id,
        {
            $pull:{
                videos: videoId,
            },
        },
        {
            new:true,
        }
    )

    return res
    .status(200)
    .json(new ApiResponse(200, updatedPlaylist, "Remove Video from Playlist Successfully"));
})


const updatePlaylist = asyncHandler(async(req,res)=>{
    const {playlistId} = req.params;
    const {name,description} = req.body;

    if (!name || !description) {
        throw new ApiError(400, "name and description both are required");
    }

    if (!isValidObjectId(playlistId)) {
        throw new ApiError(400, "Invalid PlaylistId");
    }

    const playlist = await PlayList.findById(playlistId);

    if (!playlist) {
        throw new ApiError(404, "Playlist not found");
    }

    if (playlist?.owner.toString() !== req.user?._id.toString()) {
        throw new ApiError(400, "only owner can edit the playlist");
    }

    const updatedPlaylist = await PlayList.findByIdAndUpdate(playlist?._id,
        {
            $set:{
                name,
                description,
            }
        },
        {
            new:true
        }
    )
    return res
    .status(200)
    .json(new ApiResponse(200, updatedPlaylist, "Update Playlist Successfully"));
})


const  deletePlaylist = asyncHandler(async(req,res)=>{
    const {playlistId} = req.params;

    if (!isValidObjectId(playlistId)) {
        throw new ApiError(400, "Invalid PlaylistId");
    }

    const playlist = await PlayList.findById(playlistId);

    if (!playlist) {
        throw new ApiError(404, "Playlist not found");
    }

    if (playlist?.owner.toString() !== req.user?._id.toString()) {
        throw new ApiError(400, "only owner can delete the playlist");
    }

    await PlayList.findByIdAndDelete(playlist?._id)

    return res
    .status(200)
    .json(new ApiResponse(200, {}, "Deleted Playlist Successfully"));
})


module.exports = {createPlaylist,getUserPlaylists,getPlaylistById,addVideoToPlayList,removeVideoFromPlayList,updatePlaylist,deletePlaylist};