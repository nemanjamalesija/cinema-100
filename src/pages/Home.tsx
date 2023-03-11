import Pagination from '../components/Pagination';
import Trending from '../components/Trending';

const Home = () => {
  return (
    <section className="section section__home">
      <Trending />
      <Pagination />
    </section>
  );
};

export default Home;
