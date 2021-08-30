import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import s from '../MoviesPage/MoviesPage.module.css';

import { fetchGenres, fetchMoviesBySearch } from '../../services/fetchAPI';

import MoviesList from '../../views/MoviesList';
import LoadMore from '../LoadMore/LoadMore';

import scrollDown from '../../utils/scrollDown';

const MoviesPage = () => {
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);

  const history = useHistory();
  const location = useLocation();

  const searchUrl =
    new URLSearchParams(location.search).get('searchQuery') ?? '';

  useEffect(() => {
    if (searchUrl === '') {
      return;
    }
    fetchMoviesBySearch(searchUrl, page)
      .then(response => {
        return response;
      })
      .then(data => setMovies(prevMovies => [...prevMovies, ...data.results]))
      .then(() => {
        if (page > 1) {
          scrollDown();
        }
      })
      .catch(error => console.log(`something went wrong`, error));
  }, [page, searchUrl]);

  useEffect(() => {
    fetchGenres().then(response => {
      setGenres(prevGenres => [...prevGenres, ...response]);
    });
  }, []);

  const onHandleSubmit = evt => {
    evt.preventDefault();

    if (searchQuery === '') {
      return;
    }

    setPage(1);
    setMovies([]);

    history.push({
      ...location,
      search: `searchQuery=${searchQuery}`,
    });

    setSearchQuery('');
  };

  const onHandleChange = evt => {
    setSearchQuery(evt.currentTarget.value);
  };

  const onLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  return (
    <div>
      <form className={s.form} onSubmit={onHandleSubmit}>
        <input
          className={s.input}
          onChange={onHandleChange}
          value={searchQuery}
          name={searchQuery}
        />
      </form>
      <MoviesList movies={movies} genres={genres} location={location} />
      {movies.length > 20 && <LoadMore onClick={onLoadMore} />}
    </div>
  );
};

export default MoviesPage;
