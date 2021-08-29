const API_KEY = '5a9486e7363af1432b87b7a7303a7852';
const BASE_URL = 'https://api.themoviedb.org';

const fetchPopularMovies = page => {
  const url = `${BASE_URL}/3/trending/movie/day?api_key=${API_KEY}&page=${page}`;
  return fetch(url).then(response => {
    if (response.ok) {
      return response.json();
    }
  });
};

const fetchGenres = () => {
  const url = `
${BASE_URL}/3/genre/movie/list?api_key=${API_KEY}&language=en-US`;
  return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
    })
    .then(({ genres }) => {
      return genres;
    });
};

const fetchMoviesBySearch = (searchQuery, page) => {
  const url = `

${BASE_URL}/3/search/movie?api_key=${API_KEY}&language=en-US&query=${searchQuery}&page=${page}&include_adult=false`;
  return fetch(url).then(response => {
    if (response.ok) {
      return response.json();
    }
  });
};

export { fetchPopularMovies, fetchGenres, fetchMoviesBySearch };
