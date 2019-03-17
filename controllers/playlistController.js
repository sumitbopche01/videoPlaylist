const Playlist = require('../models/playlistSchema');

/**
 * @description For creating the playlist 
 * @param {String} title title of the playlist
 * @param {String} websiteUrl Url of the website where playlist will be placed on
 * @param {Array} listOfVideoIds Ids of Videos of which the playlist is to be created
 */
const createPlaylist = (req, res, next) => {

    let { title, websiteUrl, listOfVideoIds } = req.body;
    let status = 201;

    const playlist = new Playlist({
        title,
        websiteUrl,
        listOfVideoIds
    });

    playlist.save()
    .then((response) => {
        return res.status(status).send(response);
    })
    .catch((error) => {
        next(error);
    })
}

/**
 * @description Gets the playlist data and list of videos in it.
 * @param {String} _id id of the playlist
 * @param {Integer} pageNo Page number if we have large numer of songs in single playlist
 */
const getPlaylist = (req, res, next) => {
    const LIMIT = 20;
    let skip = 0;
    let status = 200;

    const _id = req.params._id;
    const pageNo = req.params.pageNo;

    skip = pageNo * LIMIT;

    Playlist.findById( { _id }, 
        {
            "listOfVideoIds": {
                $slice: [skip, LIMIT]
            },
            __v: 0,
        })
        .populate("listOfVideoIds")
        .then((playlist) => {
            return res.status(status).send(playlist);
        })
        .catch((error) => {
            next(error);
        })
}

/**
 * 
 * @description Deletes the playlist 
 * @param {String} _id Id of the playlist
 */
const deletePlaylist = (req, res, next) => {
    let status = 200;
    const _id = req.params._id;

    Playlist.findByIdAndDelete({_id})
    .then((response) => {
        if(!response){
            next();
        }
        else {
            return res.status(status).send(response);
        }
    })
    .catch((error) => {
        next(error);
    })
}

module.exports = {
    createPlaylist,
    getPlaylist,
    deletePlaylist,
}