import { useEffect } from 'react';
import Pagination from '../components/Pagination';
import Trending from '../components/Trending';
import { useAppContext } from '../context';

const Home = () => {
  const {
    dispatch,
    state,
    state: {
      currentUser: { bookmarkeredMovies },
    },
  } = useAppContext();

  console.log(state.currentUser);

  useEffect(() => {
    dispatch({ type: 'SET_MOVIES_CURRENT_USER', payload: bookmarkeredMovies });
  }, []);

  useEffect(() => {
    console.log(state.bookmarkeredMovies);
  }, [state.bookmarkeredMovies]);

  return (
    <section className='section section__home'>
      <Trending />
      <Pagination />
    </section>
  );
};

export default Home;
