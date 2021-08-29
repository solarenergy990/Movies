import { lazy, Suspense } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import s from '../App/App.module.css';

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import Loader from 'react-loader-spinner';

import Header from '../Header/Header';
import Container from '../Container/Container';

const HomePage = lazy(() => import('../HomePage/HomePage'));
const MoviesPage = lazy(() => import('../MoviesPage/MoviesPage'));

const App = () => {
  return (
    <Container>
      <Header />
      <Suspense
        fallback={
          <div className={s.loader}>
            <Loader type="Grid" color="#00BFFF" height={80} width={80} />
          </div>
        }
      >
        <Switch>
          <Route path="/" exact>
            <HomePage />
          </Route>
          <Route path="/search" exact>
            <MoviesPage />
          </Route>
          <Redirect to="/" />
        </Switch>
      </Suspense>
    </Container>
  );
};

export default App;
