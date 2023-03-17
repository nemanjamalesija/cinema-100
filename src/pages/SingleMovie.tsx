import { useParams } from 'react-router-dom';
import { useAppContext } from '../context';
import './singleVideo.css';

const SingleMovie = () => {
  const { id } = useParams();
  const {
    state: { movies },
  } = useAppContext();

  const singleMovie = movies.flat().find((mov) => mov.imdbid === id);
  console.log(singleMovie);

  if (!singleMovie) return <h2 className='heading--secondary'>Loading...</h2>;

  const {
    description,
    director,
    genre,
    image,
    imdbid,
    rank,
    rating,
    title,
    trailer,
    writers,
    year,
  } = singleMovie;

  return (
    <article className='single__video--container'>
      <div className='single__video--photo'></div>
      <div className='react__player--div'>
        <iframe
          className='embeded-video'
          src={trailer}
          frameBorder='0'
          allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
          allowFullScreen
          title='Embedded youtube'
        />
      </div>
    </article>
  );
};

export default SingleMovie;
