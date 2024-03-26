const apiKey = 'YOUR_API_KEY'; // Replace 'YOUR_API_KEY' with your actual TMDb API key
const searchInput = document.getElementById('searchInput');
const movieList = document.getElementById('movieList');

searchInput.addEventListener('input', debounce(searchMovies, 500));

async function searchMovies() {
    const query = searchInput.value;
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}`;
    
    try {
        const response = await fetch(url);
        const data = await response.json();
        displayMovies(data.results);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

function displayMovies(movies) {
    movieList.innerHTML = '';

    movies.forEach(movie => {
        const movieElement = document.createElement('div');
        movieElement.classList.add('movie');
        movieElement.innerHTML = `
            <h2>${movie.title}</h2>
            <p>Release Date: ${movie.release_date}</p>
            <p>Rating: ${movie.vote_average}</p>
            <p>${movie.overview}</p>
        `;
        movieList.appendChild(movieElement);
    });
}

function debounce(func, delay) {
    let timeoutId;
    return function() {
        const context = this;
        const args = arguments;
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            func.apply(context, args);
        }, delay);
    };
}

