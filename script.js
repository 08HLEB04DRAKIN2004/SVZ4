const API_KEY = 'd3476595417e9eb00d3200fa664d203d';// ключ авторизации для достпуа к базе данных
const API_URL = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=`;// СТРОКА ЗАПРОСА

const main = document.getElementById('main');
const search = document.getElementById('search');

const clearSearch = document.getElementById('clear-search');

// Обработчик события для очистки поля ввода
clearSearch.addEventListener('click', () => {
    search.value = ''; // Очистить поле ввода
    main.innerHTML = ''; // Очистить результаты поиска
    getMovies('venom');
});
//запрашивает данные о фильмах с помощью API интерфеййса

async function getMovies(searchTerm) {
    const res = await fetch(API_URL + searchTerm);//запрос к серверу
    const data = await res.json();
    if (data.results && data.results.length > 0) {
        showMovies(data.results);
    } else {
        main.innerHTML = '<p>Фильмы не найдены</p>';
    }
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
        
        
 
    }
});

getMovies('venom');
