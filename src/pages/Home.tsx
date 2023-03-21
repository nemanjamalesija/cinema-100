import { useEffect } from 'react';
import Pagination from '../components/Pagination';
import Trending from '../components/Trending';
import { useAppContext } from '../context';
import { doc, getDoc } from 'firebase/firestore';
import { initialize } from '../config/firebase';

const Home = () => {
  const {
    dispatch,
    state,
    state: {
      currentUser: { bookmarkeredMovies },
    },
  } = useAppContext();
  const { db } = initialize();

  const getCurrentUserCol = async () => {
    const currentUserRef = doc(db, `users/${state.currentUser.email}`);
    const currentUserCol = await getDoc(currentUserRef);
    const { bookmarkeredMovies } = currentUserCol.data() ?? [];
    dispatch({ type: 'ADD_MOVIES_FROM_DATABASE', payload: bookmarkeredMovies });
  };

  useEffect(() => {
    getCurrentUserCol();
  }, [bookmarkeredMovies]);

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
