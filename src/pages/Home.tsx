import Pagination from '../components/Pagination';
import Trending from '../components/Trending';
import { useAppContext } from '../context';

const Home = () => {
  const {
    state: { currentUser },
  } = useAppContext();

  console.log(currentUser);

  return (
    <section className='section section__home'>
      <Trending />
      <Pagination />
    </section>
  );
};

export default Home;
