const API_KEY = 'd3476595417e9eb00d3200fa664d203d';
const API_URL = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=`;

const main = document.getElementById('main');
const search = document.getElementById('search');


//запрашивает данные о фильмах с помощью API интерфеййса

async function getMovies(searchTerm) {
    const res = await fetch(API_URL + searchTerm);
    const data = await res.json();

    showMovies(data.results);
}

function showMovies(movies) {
    main.innerHTML = '';//Свойство получения и установление даннх

    movies.forEach(movie => {
        const { poster_path, title, vote_average, overview } = movie;

        const movieEl = document.createElement('div');
        movieEl.classList.add('card');

        movieEl.innerHTML = `
            <img src="https://image.tmdb.org/t/p/w500${poster_path}" alt="${title}">
            <h2>${title}</h2>
            <p>Rating: ${vote_average}</p>
            <p>${overview}</p>
        `;

        main.appendChild(movieEl);
    });
}

search.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
        const searchTerm = e.target.value;

        getMovies(searchTerm);
        
        search.value = '';
        search.blur();
    }
});

getMovies(' ');
