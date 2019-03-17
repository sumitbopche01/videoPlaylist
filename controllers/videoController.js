const Video = require('../models/videoSchema');

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

