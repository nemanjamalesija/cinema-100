import { useAppContext } from '../context';
import { iconSidebarSearch } from '../utils/icons/iconsSidebar';
import './sidebar.css';

const Sidebar = () => {
  const {
    dispatch,
    state: {
      movies,
      showFilters,
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
        <button
          name='filterBookmakered'
          data-value='bookmakered'
          className='btn__sidebar btn__sidebar--bookmark'
          onClick={() => dispatch({ type: 'SHOW_BOOKMARKERED_MOVIES' })}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 24 24'
            fill='currentColor'
            className={
              showFilters
                ? 'sidebar__icon sidebar__personal--bookmark'
                : 'sidebar__icon sidebar__personal--bookmark sidebar__icon--active'
            }
          >
            <path
              fillRule='evenodd'
              d='M6.32 2.577a49.255 49.255 0 0111.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 01-1.085.67L12 18.089l-7.165 3.583A.75.75 0 013.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93z'
              clipRule='evenodd'
            />
          </svg>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
