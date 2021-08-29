import React from 'react';
import s from '../Header/Header.module.css';

const Header = () => {
  return (
    <header className={s.header}>
      <button type="button" className={s.link}>
        Home
      </button>
      <button type="button" className={s.link}>
        Search
      </button>
    </header>
  );
};

export default Header;
