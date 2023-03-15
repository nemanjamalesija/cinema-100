import { useAppContext } from '../context';
import HomeMovies from './HomeMovies';
import PagiationButtons from './PagiationButtons';
import Sidebar from './Sidebar';
import BookmarkeredMovies from './BookmarkeredMovies';

const Pagination = () => {
  const {
    state: {
      showFilters,
      showBookmarkeredVideos,
      filters: { genre },
    },
  } = useAppContext();

  return (
    <section className='section section__pagination'>
      <Sidebar />
      <main className='container__pagination'>
        <h2 className='heading--secondary heading-movies'>
          {showBookmarkeredVideos
            ? genre === 'All'
              ? 'Your library (bookmakered movies)'
              : genre + ' (bookmakered movies)'
            : genre === 'All'
            ? 'Top 100'
            : genre + (showBookmarkeredVideos ? ' (bookmarked movies)' : '')}
        </h2>
        {showFilters && <HomeMovies />}
        {showBookmarkeredVideos && <BookmarkeredMovies />}
        <PagiationButtons />
      </main>
    </section>
  );
};

export default Pagination;
