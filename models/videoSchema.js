const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const videoSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    thumbnailUrl:{
        type: String,
        required: true
    },
    videoUrl:{
        type: String,
        required: true
    },
    duration:{
        type: Number,
        required: true      
    }
});

const Video = mongoose.model("video", videoSchema);

module.exports = Video;

