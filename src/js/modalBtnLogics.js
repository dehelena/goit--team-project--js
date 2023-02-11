// import loadMoviesList from "./watchedQueuedList";

const onBtnClick = function (event, storageKey) {
    let text = event.target.textContent;
    const movieId = event.target.dataset.id;
    
    let queueMovie = JSON.parse(localStorage.getItem(storageKey));

    if(!queueMovie){
        queueMovie = [];
    }

    if (text.includes('add to')) {
        event.target.textContent = text.replace('add to', 'remove from');
        queueMovie.push(movieId.toString());
        localStorage.setItem(storageKey, JSON.stringify(queueMovie));
    } else{
        event.target.textContent = text.replace('remove from', 'add to');
        queueMovie = queueMovie.filter((item) => item !== movieId)
        localStorage.setItem(storageKey, JSON.stringify(queueMovie));
    }

    let idList = JSON.parse(localStorage.getItem(storageKey));
    // loadMoviesList(idList);
}; 

export default onBtnClick;