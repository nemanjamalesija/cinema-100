import HomeMovies from './HomeMovies';
import PagiationButtons from './PagiationButtons';
import Sidebar from './Sidebar';

const Pagination = () => {
  return (
    <section className="section section__pagination">
      <Sidebar />
      <main className="container__pagination">
        <h2 className="heading--secondary heading-movies">Top 100</h2>
        <HomeMovies />
        <PagiationButtons />
      </main>
    </section>
  );
};

export default Pagination;
