var express = require('express');
var router = express.Router();
const videoController = require('../controllers/videoController');

router.get('/get/:_id', videoController.getVideoData);
router.post('/add', videoController.addVideo);
router.delete('/delete/:_id', videoController.deleteVideo);

module.exports = router;
