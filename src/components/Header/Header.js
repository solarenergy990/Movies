import React from 'react';
import { NavLink } from 'react-router-dom';
import s from '../Header/Header.module.css';

const Header = () => {
  return (
    <header className={s.header}>
      <NavLink to="/" className={s.link} activeClassName={s.activeLink} exact>
        Home
      </NavLink>
      <NavLink to="/search" className={s.link} activeClassName={s.activeLink}>
        Search
      </NavLink>
    </header>
  );
};

export default Header;
