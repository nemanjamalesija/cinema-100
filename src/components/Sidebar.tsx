import { useAppContext } from '../context';
import { iconSidebarSearch } from '../utils/icons/iconsSidebar';
import './sidebar.css';

const Sidebar = () => {
  const {
    dispatch,
    state: {
      movies,
      showHome,
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
        <div className='sidebar__icons'>
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
                showHome
                  ? 'sidebar__icon'
                  : 'sidebar__icon sidebar__icon--active'
              }
            >
              <path
                fillRule='evenodd'
                d='M6.32 2.577a49.255 49.255 0 0111.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 01-1.085.67L12 18.089l-7.165 3.583A.75.75 0 013.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93z'
                clipRule='evenodd'
              />
            </svg>
          </button>
          <button
            className='btn__sidebar btn__sidebar--bookmark'
            onClick={() => dispatch({ type: 'SHOW_HOME_MOVIES' })}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 24 24'
              fill='currentColor'
              className={
                showHome
                  ? 'sidebar__icon sidebar__icon--active'
                  : 'sidebar__icon '
              }
            >
              <path d='M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z' />
              <path d='M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z' />
            </svg>
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
