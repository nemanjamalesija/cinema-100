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

  console.log(state.currentUser);

  const getCurrentUserCol = async () => {
    const currentUserRef = doc(db, `users/${state.currentUser.email}`);
    const currentUserCol = await getDoc(currentUserRef);
    const { bookmarkeredMovies } = currentUserCol.data() ?? [];
    dispatch({ type: 'SET_MOVIES_CURRENT_USER', payload: bookmarkeredMovies });
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
