import { useAppContext } from '../context';
import HomeMovies from './HomeMovies';
import LikedAndBookmakeredMovies from './LikedAndBookmakeredMovies';
import PagiationButtons from './PagiationButtons';
import Sidebar from './Sidebar';

const Pagination = () => {
  const {
    state: {
      showFilters,
      showLikedAndBookmakered,
      filters: { genre },
    },
  } = useAppContext();

  return (
    <section className='section section__pagination'>
      <Sidebar />
      <main className='container__pagination'>
        <h2 className='heading--secondary heading-movies'>
          {genre === 'All'
            ? 'Top 100'
            : genre.slice(0, 1).toUpperCase() + genre.slice(1)}
        </h2>
        {showFilters && <HomeMovies />}
        {showLikedAndBookmakered && <LikedAndBookmakeredMovies />}
        <PagiationButtons />
      </main>
    </section>
  );
};

export default Pagination;
