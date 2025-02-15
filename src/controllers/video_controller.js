const {isValidObjectId} = require("mongoose");
const {asyncHandler} = require("../utils/asyncHandler");
const {ApiError} = require("../utils/ApiError");
const {ApiResponse} = require("../utils/ApiResponse");
const Video = require("../models/video_model");
const User = require("../models/user_model");
const {uploadOnCloudinary} = require("../utils/cloudinary");



const getAllVideos = asyncHandler(async (req, res)=>{
    const {page=1,limit=10,sortBy,sortType,query,userId} = req.query;
    // //Todo get all videos based on the query, sort and pagination
    
    console.log(userId);
    const pipeline = [];

    // for using Full Text based search u need to create a search index in mongoDB atlas
    // you can include field mapppings in search index eg.title, description, as well
    // Field mappings specify which fields within your documents should be indexed for text search.
    // this helps in seraching only in title, desc providing faster search results
    // here the name of search index is 'search-videos'
    if (query) {
        pipeline.push({
            $search: {
                index: "search-videos",
                text: {
                    query: query,
                    path: ["title", "description"] //search only on title, desc
                }
            }
        });
    }

    if (userId) {
        if (!isValidObjectId(userId)) {
            throw new ApiError(400, "Invalid userId");
        }

        pipeline.push({
            $match: {
                owner: new mongoose.Types.ObjectId(userId)
            }
        });
    }

    // fetch videos only that are set isPublished as true
    pipeline.push({ $match: { isPublished: true } });

    //sortBy can be views, createdAt, duration
    //sortType can be ascending(-1) or descending(1)
    if (sortBy && sortType) {
        pipeline.push({
            $sort: {
                [sortBy]: sortType === "asc" ? 1 : -1
            }
        });
    } else {
        pipeline.push({ $sort: { createdAt: -1 } });
    }

    pipeline.push(
        {
            $lookup: {
                from: "users",
                localField: "owner",
                foreignField: "_id",
                as: "ownerDetails",
                pipeline: [
                    {
                        $project: {
                            username: 1,
                            "avatar.url": 1
                        }
                    }
                ]
            }
        },
        {
            $unwind: "$ownerDetails"
        }
    )

    const videoAggregate = Video.aggregate(pipeline);

    const options = {
        page: parseInt(page, 10),
        limit: parseInt(limit, 10)
    };

    const video = await Video.aggregatePaginate(videoAggregate, options);

    return res
        .status(200)
        .json(new ApiResponse(200, video, "Videos fetched successfully")); 
})


const publishVideo = asyncHandler(async (req,res)=>{
    const {title,description} = req.body;
    //console.log(req.body)
    //Todo get video, upload to cloudinary, create video
    if (
        [title,description].some((field) => field?.trim() === "")
    ){
        throw new ApiError(400, "All fields are required")
    }

        const videoFileLocalPath = req.files?.videoFile[0].path;
        const thumbnailLocalPath = req.files?.thumbnail[0].path;

        const videoFile = await uploadOnCloudinary(videoFileLocalPath);
        console.log(videoFile);

        const thumbnail = await uploadOnCloudinary(thumbnailLocalPath);
        console.log(thumbnail)

    if(!videoFile || !thumbnail){
        throw new ApiError(500,"Error uploading video or thumbnail");
    }

    const video = await Video.create({
        videoFile: videoFile.secure_url,
        thumbnail: thumbnail.secure_url,
        title,
        description,
        duration: videoFile.duration,
        owner: req.user._id,
        isPublished: false
    });
    console.log(video)

    await video.save();

    return res
    .status(201)
    .json(new ApiResponse(200,video,"Video published successfully"));

})


const getVideoById = asyncHandler(async (req,res)=>{
    const {videoId} = req.params;
    //Todo get video by id
})


const updateVideo = asyncHandler(async (req,res)=>{
    const {videoId} = req.params;
    //Todo update video details like title,description,thumbnail
})


const deleteVideo = asyncHandler(async (req,res)=>{
    const {videoId} = req.params;
    //Todo delete video 
})


const togglePublishStatus = asyncHandler(async (req,res)=>{
    const {videoId} = req.params;
})



module.exports = {getAllVideos,publishVideo,getVideoById,updateVideo,deleteVideo,togglePublishStatus};