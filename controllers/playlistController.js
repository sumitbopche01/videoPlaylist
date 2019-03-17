const Playlist = require('../models/playlistSchema');

const createPlaylist = (req, res, next) => {
    let {
        title,
        websiteUrl,
        listOfVideoIds
    } = req.body;
    let status = 201;
    const playlist = new Playlist({
        title,
        websiteUrl,
        listOfVideoIds
    });
    playlist.save()
        .then((response) => {
            console.log("response is as ----- ", response);
            return res.status(status).send(response);
        })
        .catch((error) => {
            console.log("response is as --- ", error);
            next(error);
        })
}

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