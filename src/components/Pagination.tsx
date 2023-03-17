import { useAppContext } from '../context';
import HomeMovies from './HomeMovies';
import PagiationButtons from './PagiationButtons';
import Sidebar from './Sidebar';
import BookmarkeredMovies from './BookmarkeredMovies';

const Pagination = () => {
  const {
    state: {
      showHome,
      filteredMovies,
      moviesHomeIndex,
      filters: { genre },
    },
  } = useAppContext();

  return (
    <section className='section section__pagination'>
      <Sidebar />
      <main className='container__pagination'>
        <h2 className='heading--secondary heading-movies'>
          {showHome
            ? genre === 'All'
              ? 'Top 100'
              : genre
            : genre === 'All'
            ? 'Your bookmakered movies'
            : genre + ' (bookmarked movies)'}
        </h2>
        {showHome && <HomeMovies />}
        {!showHome && <BookmarkeredMovies />}
        {showHome && filteredMovies[moviesHomeIndex].length !== 0 && (
          <PagiationButtons />
        )}
      </main>
    </section>
  );
};

export default Pagination;
