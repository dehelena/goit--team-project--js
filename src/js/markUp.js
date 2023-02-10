export default function createMarkup(results, { data }) {

  const defaultImage = `https://raw.githubusercontent.com/yuriykosh/goit--team-project--js/main/src/images/main-home/poster-filler-desktop.jpeg`; ///////////

    return results.map(result => {
      const { genre_ids, poster_path, release_date, title, vote_average, id } = result;
      const posterLink = `https://image.tmdb.org/t/p/w500/${poster_path}`;
      const releaseYear = release_date.slice(0, 4);
      const genresList = data.genres.filter(genre => genre_ids.includes(genre.id))
      .map(item => item.name);
      const genres = genresList.length > 2 ? [genresList[0], genresList[1], 'Other'].join(', ') : genresList.join(', ');
      const voteAverage = vote_average.toFixed(1);

     return `
     <li class="movies__item" id=${id}>
        <div class="movies__wrapper">
        <img onerror="this.onerror=null;this.src='${defaultImage}';"
         alt=${title} src=${posterLink} class="movies__poster" loading="lazy">
        </div>
        <div class="movies__meta">
          <h2 class="movies__title">${title}</h2>
          <div class="movies__desc">
            <span class="movies__desc-genres">${genres}</span>|
            <span class="movies__desc-release-year">${releaseYear}</span>
            <span class="movies__vote is-hidden">${voteAverage}</span>
          </div>
        </div>
      </li>`;
     })
 }     
