import React from 'react';
import { useAppContext } from '../context';
import './paginationControl.css';

type paginationButtonsProps = {
  setMoviesHomeIndex: React.Dispatch<React.SetStateAction<number>>;
  moviesHomeIndex: number;
};

const PagiationButtons = ({
  setMoviesHomeIndex,
  moviesHomeIndex,
}: paginationButtonsProps) => {
  const {
    state: { movies },
  } = useAppContext();

  const incrementPageHandler = () => {
    setMoviesHomeIndex((prev) => {
      if (prev === movies.length - 1) return movies.length - 1;
      else return prev + 1;
    });
  };

  const decrementPageHandler = () => {
    setMoviesHomeIndex((prev) => {
      if (prev === 0) return 0;
      else return prev - 1;
    });
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
      >
        {i + 1}
      </button>
    );
  });

  return (
    <div className="pagination__control--container">
      <button
        className="btn__control btn__control--left"
        onClick={decrementPageHandler}
      >
        &#x2190;
      </button>
      <div className="pagination__buttons">{paginationButtons}</div>
      <button
        className="btn__control btn__control--right"
        onClick={incrementPageHandler}
      >
        &#x2192;
      </button>
    </div>
  );
};

export default PagiationButtons;
