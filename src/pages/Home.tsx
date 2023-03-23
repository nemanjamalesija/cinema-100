import { useEffect } from 'react';
import Pagination from '../components/Pagination';
import Trending from '../components/Trending';
import { useAppContext } from '../context';
import { doc, getDoc } from 'firebase/firestore';
import { initialize } from '../config/firebase';

const Home = () => {
  const {
    dispatch,

    state: {
      currentUser: { email },
    },
  } = useAppContext();
  const { db } = initialize();

  const getCurrentUserCol = async () => {
    const currentUserRef = doc(db, `users/${email}`);
    const currentUserCol = await getDoc(currentUserRef);
    const { bookmarkeredMovies } = currentUserCol.data() ?? [];
    console.log(bookmarkeredMovies);
    dispatch({ type: 'ADD_MOVIES_FROM_DATABASE', payload: bookmarkeredMovies });
  };

  useEffect(() => {
    getCurrentUserCol();
  }, []);

  return (
    <section className='section section__home'>
      <Trending />
      <Pagination />
    </section>
  );
};

export default Home;
