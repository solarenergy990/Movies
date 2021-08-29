import React from 'react';
import s from '../HomePage/HomePage.module.css';
import { useState, useEffect } from 'react';
import { fetchPopularMovies, fetchGenres } from '../../services/fetchAPI';
import findGenre from '../../utils/genreFinder';

const POSTER_URL = 'https://image.tmdb.org/t/p/w300/';

const HomePage = () => {
  const [page, setPage] = useState(1);
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    fetchPopularMovies(page)
      .then(response => {
        // console.log(response);
        return response;
      })

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
      //   console.log(response);
      setGenres(prevGenres => [...prevGenres, ...response]);
    });
  }, []);

  const onLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const scrollDown = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
    // console.log(document.documentElement.scrollHeight);
  };

  return (
    <div>
      <section className={s.section}>
        <ul className={s.gallery}>
          {movies &&
            movies.map(movie => (
              <li className={s.galleryItemCard} key={movie.id}>
                <div className={s.posterContainer}>
                  <img
                    src={`${POSTER_URL}${movie.poster_path}`}
                    alt={movie.title}
                  />
                </div>
                <div>
                  <h2 className={s.textTitle}>{movie.title}</h2>
                  <p className={s.textGenre}>
                    {findGenre(movie, genres)} | {movie.release_date}
                  </p>
                </div>
              </li>
            ))}
        </ul>
        <button type="button" className={s.loadMoreBtn} onClick={onLoadMore}>
          Load more
        </button>
      </section>
    </div>
  );
};

export default HomePage;
