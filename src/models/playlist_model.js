const  mongoose = require('mongoose');

const playListSchema = new mongoose.Schema(
  {
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    videos: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Video"
        } 
    ],
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }  
}, 
{
  timestamps: true
})   

module.exports = mongoose.model("PlayList", playListSchema);