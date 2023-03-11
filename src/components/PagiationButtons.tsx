import React from 'react';
import { useAppContext } from '../context';
import './paginationControl.css';

const PagiationButtons = () => {
  const {
    state: { movies, moviesHomeIndex },
    dispatch,
  } = useAppContext();

  const incrementPageIndexHandler = () => {
    dispatch({ type: 'INCREMENT_PAGE_INDEX' });
  };

  const decrementPageIndexHandler = () => {
    dispatch({ type: 'DECREMENT_PAGE_INDEX' });
  };

  const setPageIndexHandler = (index: number) => {
    dispatch({ type: 'SET_PAGE_INDEX', payload: index });
  };

  const paginationButtons = movies.map((_, i) => {
    return (
      <button
        key={i}
        className={
          i === moviesHomeIndex
            ? 'pagination__btn pagination__btn--active'
            : 'pagination__btn'
        }
        onClick={() => setPageIndexHandler(i)}
      >
        {i + 1}
      </button>
    );
  });

  return (
    <div className="pagination__control--container">
      <button
        className="btn__control btn__control--left"
        onClick={decrementPageIndexHandler}
      >
        &#x2190;
      </button>
      <div className="pagination__buttons">{paginationButtons}</div>
      <button
        className="btn__control btn__control--right"
        onClick={incrementPageIndexHandler}
      >
        &#x2192;
      </button>
    </div>
  );
};

export default PagiationButtons;
