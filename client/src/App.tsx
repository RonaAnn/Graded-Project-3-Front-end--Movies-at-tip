import Home from './components/Home/Home';
import MoviesList from './components/Movies/MoviesList';
import MoviesDetails from './components/MovieDetails/MoviesDetails';
import { Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/movies-in-theaters' element={<MoviesList />} />
        <Route path='/top-rated-movies' element={<MoviesList />} />
        <Route path='/top-rated-india' element={<MoviesList />} />
        <Route path='/movies-coming' element={<MoviesList />} />
        <Route path='/favourite' element={<MoviesList />} />
        <Route path="/movies-in-theaters/:id" element={<MoviesDetails />} />
        <Route path="/movies-coming/:id" element={<MoviesDetails />} />
        <Route path="/top-rated-india/:id" element={<MoviesDetails />} />
        <Route path="/top-rated-movies/:id" element={<MoviesDetails />} />
        <Route path='/favourite/:id' element={<MoviesDetails />} />
      </Routes>
    </>
  );
}

export default App;
