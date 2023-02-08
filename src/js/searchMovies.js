import { Notify } from "notiflix";
import { ApiService } from './ApiServise';
import createMarkup from './markup';
import { spinnerStart, spinnerStop } from "./spinner";

const gallery = document.querySelector('.movies');   
const formEl = document.querySelector('.js-form');

formEl.addEventListener('submit', onFormSubmit);
formEl.addEventListener('input', onFormInput);

Notify.init({
    width: '400px',
    clickToClose: true,
});

function onFormSubmit(e) {
    e.preventDefault();
    gallery.innerHTML = ''; 
    formEl.reset();

    if (ApiService.query === '') {
        return Notify.failure('Please insert the name of the movie.');
    }
    
    ApiService.resetPage();
    spinnerStart();
    fetchMovies();
}

function onFormInput(e) {
    ApiService.query = e.target.value.trim();
}

async function fetchMovies() {
    try {
        const response = await ApiService.getMoviesByName();
        const genresList = await ApiService.getGenresList();
        const { data } = response;
        const { page, results,total_pages, total_results } = data;


        if (results.length === 0) {
            spinnerStop()
            return Notify.failure('Sorry, there are no movies matching your search query. Please try again.');
        }
        
        if (total_results !== 0) {
            Notify.success(`Hooray! We found ${total_results} movies.`);
        }

        const markUp = createMarkup(results, genresList).join('');
        gallery.insertAdjacentHTML('beforeend', markUp);  // возможно перепишу на InnerHTML

        spinnerStop()

    } catch (error) {
        console.log(error);
        return Notify.failure('Something went wrong. Please try again later.');
    }
}