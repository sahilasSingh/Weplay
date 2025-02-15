const mongoose = require('mongoose');

const tweetSchema = new mongoose.Schema(
    {
        content:{
            type: String
        },
        owner:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        }
    },
{timestamps:true});

module.exports = mongoose.model("Tweet",tweetSchema);