import { lazy, Suspense, useEffect, useState } from 'react';
import {
  Link,
  useLocation,
  useHistory,
  useParams,
  useRouteMatch,
  Route,
  Switch,
} from 'react-router-dom';
import s from '../MovieDetailsPage/MovieDetailsPage.module.css';
import Loader from 'react-loader-spinner';

import { fetchMovieById } from '../../services/fetchAPI';

const Cast = lazy(() => import('../Cast/Cast'));
const Reviews = lazy(() => import('../Reviews/Reviews'));

const MovieDetailsPage = () => {
  const [movie, setMovie] = useState(null);

  const { movieId } = useParams();
  const location = useLocation();
  const history = useHistory();
  const { url, path } = useRouteMatch();

  useEffect(() => {
    fetchMovieById(movieId).then(data => setMovie(data));
  }, [movieId]);

  const onReturn = () => {
    history.push(location?.state?.from ?? '/');
  };
  return (
    <>
      {movie && (
        <>
          <button className={s.ReturnBtn} type="button" onClick={onReturn}>
            Return
          </button>
          <div className={s.poster}>
            <img
              src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
              alt={movie.title}
            />
            <div className={s.posterInfo}>
              <h3>
                <span>{`${movie.title} / `}</span>
                <span>{movie.release_date}</span>
              </h3>
              <h3>Overview</h3>
              <p>{movie.overview}</p>
              <h3>Genres:</h3>
              <ul>
                {movie.genres.map(genre => {
                  return <li key={genre.id}>{genre.name}</li>;
                })}
              </ul>
            </div>
          </div>
          <div className={s.navLink}>
            <Link
              className={s.link}
              to={{
                pathname: `${url}/cast`,
                state: { ...location.state },
              }}
            >
              Cast
            </Link>
            <Link
              className={s.link}
              to={{
                pathname: `${url}/reviews`,
                state: { ...location.state },
              }}
            >
              Review
            </Link>
          </div>

          <Suspense
            fallback={
              <div className={s.loader}>
                <Loader type="Grid" color="#00BFFF" height={80} width={80} />
              </div>
            }
          >
            <Switch>
              <Route path={`${path}/cast`} exact>
                <Cast />
              </Route>
              <Route path={`${path}/reviews`}>
                <Reviews />
              </Route>
            </Switch>
          </Suspense>
        </>
      )}
    </>
  );
};

export default MovieDetailsPage;
