const Video = require('../models/videoSchema');

/**
 * @description adds the video metadata in the database
 * @param {String} title  title of the video
 * @param {String} videoUrl video url
 * @param {String} thumbnailUrl thumbnail image url
 * @param {Integer} duration duration of the video in seconds
 */
const addVideo = (req, res, next)=> {
    let result = {};
    let status = 201;

    const { title, videoUrl, thumbnailUrl, duration } = req.body;
    const video = new Video({ title, videoUrl, thumbnailUrl, duration });     //Document instance of a model

    video.save()
    .then((response)=>{
        result.status = status;
        result.result = video;
        return res.status(status).send(result);
    })
    .catch((error) => {
        next();
    })
}

/**
 * @description Get the metadata of the video
 * @param {String} _id _id of the video
 */
const getVideoData = (req, res, next) => {
    let result = {};
    let status = 200;

    const _id = req.params._id;
    Video.findById({_id})
    .then((videoData) => {
        if(videoData.length > 0){
            next();
        }
        else{
            return res.status(status).send(videoData);    
        }
    })
    .catch((error) => {
        next();
    })
}

/**
 * 
 * @description Deletes the video 
 * @param {String} _id _id of the video
 */
const deleteVideo = (req, res,next) => {
    let result = {};
    let status = 200;

    const _id = req.params._id;
    Video.findByIdAndDelete({_id})
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
    addVideo,
    getVideoData,
    deleteVideo,
}

