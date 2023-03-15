import { useAppContext } from '../context';
import {
  iconBookmarkSidebar,
  iconLikedSidebar,
  iconSidebarSearch,
} from '../utils/icons/iconsSidebar';
import './sidebar.css';

const Sidebar = () => {
  const {
    dispatch,
    state: {
      movies,
      filters: { currentMovie, genre },
    },
  } = useAppContext();

  const setFilterHandler = (
    e: React.FormEvent<HTMLInputElement> | React.FormEvent<HTMLSelectElement>
  ) => {
    const name = e.currentTarget.name;
    const value = e.currentTarget.value;

    dispatch({ type: 'SET_FILTER', payload: { name, value } });
  };

  const genres = [
    'All',
    ...new Set(
      movies
        .flat()
        .map((movie) => movie.genre)
        .flat()
        .map((genre) => genre)
    ),
  ];

  return (
    <aside className='sidebar'>
      <div className='sidebar__search'>
        <div className='search-div'>
          <input
            type='text'
            className='sidebar__input'
            placeholder='Search'
            name='currentMovie'
            value={currentMovie}
            onChange={setFilterHandler}
          />
          <button className='btn-search'>{iconSidebarSearch}</button>
        </div>
      </div>

      <div className='sidebar__personalize'>
        <select
          name='genre'
          className='sidebar__select'
          onChange={setFilterHandler}
          value={genre}
        >
          {genres.map((g, i) => (
            <option key={i} className='sidebar__select--option' value={g}>
              {g}
            </option>
          ))}
        </select>
        <button className='btn__sidebar btn__sidebar--liked'>
          {iconLikedSidebar}
        </button>
        <button className='btn__sidebar btn__sidebar--bookmark'>
          {iconBookmarkSidebar}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
