import React from 'react';
import s from '../HomePage/HomePage.module.css';
import { useState, useEffect } from 'react';
import { fetchPopularMovies, fetchGenres } from '../../services/fetchAPI';
import { useLocation } from 'react-router-dom';

import MoviesList from '../../views/MoviesList';

import scrollDown from '../../utils/scrollDown';

import LoadMore from '../LoadMore/LoadMore';

const HomePage = () => {
  const [page, setPage] = useState(1);
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);

  const location = useLocation();
  useEffect(() => {
    fetchPopularMovies(page)
      .then(data => setMovies(prevMovies => [...prevMovies, ...data.results]))
      .then(() => {
        if (page > 1) {
          scrollDown();
        }
      })
      .catch(error => console.log(`something went wrong`, error));
  }, [page]);

  useEffect(() => {
    fetchGenres().then(response => {
      setGenres(prevGenres => [...prevGenres, ...response]);
    });
  }, []);

  const onLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  return (
    <div>
      <section className={s.section}>
        <MoviesList movies={movies} genres={genres} location={location} />
        <LoadMore onClick={onLoadMore} />
      </section>
    </div>
  );
};

export default HomePage;
