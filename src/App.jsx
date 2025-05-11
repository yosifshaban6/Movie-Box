import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import { MoviesList } from './pages/moviesList';
import { BrowserRouter } from 'react-router';
import RoutesList from './routes/routesList';
import Header from './components/Header';

function App() {

  return (
    // <>
    //   <MoviesList></MoviesList>
    // </>
    <BrowserRouter>
      <Header></Header>
      <RoutesList></RoutesList>
    </BrowserRouter>
  )
}

export default App
