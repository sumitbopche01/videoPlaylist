const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const playlistSchema = new Schema ({
    title:{
        type: String,
        required: true,
    },
    websiteUrl: {
        type: String,
    },
    listOfVideoIds:[{
            type: Schema.Types.ObjectId,
            ref: 'video'
    }]
})

const Playlist = mongoose.model('playlist', playlistSchema);


module.exports = Playlist;

