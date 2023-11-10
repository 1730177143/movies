import React from "react";
import PageTemplate from '../components/templateMovieListPage'
import { getUpcoming } from "../api/tmdb-api";
import Spinner from '../components/spinner';
import { useQuery } from 'react-query';
import AddToPlaylistIcon from '../components/cardIcons/playlistAdd'

const UpcomingMoviesPage = (props) => {
  // const [movies, setMovies] = useState([]);
  const {  data, error, isLoading, isError }  = useQuery('discoverUpcoming', getUpcoming)

  if (isLoading) {
    return <Spinner />
  }

  if (isError) {
    return <h1>{error.message}</h1>
  }  
  const movies = data.results;

  const playlist = movies.filter(m => m.necessarywatch)
  localStorage.setItem('playlist', JSON.stringify(playlist))

  return (
    <PageTemplate
      title='Upcoming Movies'
      movies={movies}
      action={(movie) => {
        return <AddToPlaylistIcon movie={movie} />
      }}    
    />
    
  );
};
export default UpcomingMoviesPage;