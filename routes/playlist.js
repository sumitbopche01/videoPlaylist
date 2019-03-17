var express = require('express');
var router = express.Router();

const playlistController = require('../controllers/playlistController');

router.post('/create', playlistController.createPlaylist);
router.get('/get/:_id/:pageNo', playlistController.getPlaylist);
router.delete('/delete/:_id', playlistController.deletePlaylist);

module.exports = router;

