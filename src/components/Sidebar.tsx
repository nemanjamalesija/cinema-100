import { useAppContext } from '../context';
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
    console.log(name, value);
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
  console.log(genre);

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
          <button className='btn-search'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 24 24'
              fill='currentColor'
              className='icon__search'
            >
              <path
                fillRule='evenodd'
                d='M10.5 3.75a6.75 6.75 0 100 13.5 6.75 6.75 0 000-13.5zM2.25 10.5a8.25 8.25 0 1114.59 5.28l4.69 4.69a.75.75 0 11-1.06 1.06l-4.69-4.69A8.25 8.25 0 012.25 10.5z'
                clipRule='evenodd'
              />
            </svg>
          </button>
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

        <svg
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 24 24'
          fill='currentColor'
          className='sidebar__icon sidebar__personal--liked'
        >
          <path d='M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z' />
        </svg>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 24 24'
          fill='currentColor'
          className='sidebar__icon sidebar__personal--bookmark'
        >
          <path
            fillRule='evenodd'
            d='M6.32 2.577a49.255 49.255 0 0111.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 01-1.085.67L12 18.089l-7.165 3.583A.75.75 0 013.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93z'
            clipRule='evenodd'
          />
        </svg>
      </div>
    </aside>
  );
};

export default Sidebar;
