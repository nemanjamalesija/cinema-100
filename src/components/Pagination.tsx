import { useState } from 'react';
import HomeMovies from './HomeMovies';
import PagiationButtons from './PagiationButtons';
import Sidebar from './Sidebar';

const Pagination = () => {
  const [moviesHomeIndex, setMoviesHomeIndex] = useState(0);

  return (
    <section className="section section__pagination">
      <div className="container container__pagination">
        <h2 className="heading--secondary heading-movies">
          Recomended for you
        </h2>

        <main className="pagination__main">
          <HomeMovies />
          <PagiationButtons />
          <Sidebar />
        </main>
      </div>
    </section>
  );
};

export default Pagination;
