import React from 'react';
import { useAppContext } from '../context';

const PagiationButtons = () => {
  const {
    state: { movies },
  } = useAppContext();

  const paginationButtons = movies.map((_, i) => {
    return (
      <button key={i} className="pagination__btn">
        {i + 1}
      </button>
    );
  });

  return <div className="pagination__buttons">{paginationButtons}</div>;
};

export default PagiationButtons;
