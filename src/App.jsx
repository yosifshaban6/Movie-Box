import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import { MoviesList } from './pages/moviesList';
import { BrowserRouter } from 'react-router';
import RoutesList from './routes/routesList';

function App() {
  
  return (
    // <>
    //   <MoviesList></MoviesList>
    // </>
    <BrowserRouter>
    <RoutesList></RoutesList>
    </BrowserRouter>
  )
}

export default App
