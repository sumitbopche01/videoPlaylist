/**
 * @description Function to shuffle the playlist provided
 * @param {Array} playlist Its array of video objects
 */
const shuffle = (playlist) => {

    let currentIndex = playlist.length;
    let randomIndex = 0;
    let temp ;
    while(currentIndex !== 0){
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        temp = playlist[currentIndex];
        playlist[currentIndex] = playlist[randomIndex];
        playlist[randomIndex] = temp;
    }
    
    return playlist;
    
}

module.exports = {
    shuffle,
}

