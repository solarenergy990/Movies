import React from 'react';
import { NavLink } from 'react-router-dom';
import s from '../Header/Header.module.css';

const Header = () => {
  return (
    <header className={s.header}>
      <nav>
        <NavLink to="/" className={s.link} activeClassName={s.activeLink} exact>
          Home
        </NavLink>
        <NavLink to="/movies" className={s.link} activeClassName={s.activeLink}>
          Search
        </NavLink>
      </nav>
    </header>
  );
};

export default Header;
