import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchCastById } from '../../services/fetchAPI';
import s from '../Cast/Cast.module.css';

const Cast = () => {
  const [moviesCast, setMoviesCast] = useState([]);

  const { movieId } = useParams();

  useEffect(() => {
    fetchCastById(movieId).then(cast => setMoviesCast(cast));
  }, [movieId]);

  return (
    <>
      <ul className={s.cardSet}>
        {moviesCast.map(cast => (
          <li key={cast.id} className={s.item}>
            {
              <div>
                <img
                  src={`https://image.tmdb.org/t/p/w200/${cast.profile_path}`}
                  alt={cast.name}
                />
                <h4 className={s.actor}>{cast.name}</h4>
              </div>
            }
          </li>
        ))}
      </ul>
    </>
  );
};

export default Cast;
