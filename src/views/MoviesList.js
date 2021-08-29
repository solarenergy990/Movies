import React from 'react';
import findGenre from '../utils/genreFinder';
import s from '../views/views.module.css';

const POSTER_URL = 'https://image.tmdb.org/t/p/w300/';

const MoviesList = ({ movies, genres }) => {
  return (
    <>
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
    </>
  );
};

export default MoviesList;
