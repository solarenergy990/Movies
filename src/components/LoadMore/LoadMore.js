import React from 'react';
import s from '../LoadMore/LoadMore.module.css';
import PropTypes from 'prop-types';

const LoadMore = ({ onClick }) => {
  return (
    <button type="button" className={s.loadMoreBtn} onClick={onClick}>
      Load more
    </button>
  );
};

LoadMore.propTypes = {
  onLoadMore: PropTypes.func,
};

export default LoadMore;
