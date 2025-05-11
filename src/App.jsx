import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './App.css'
import { BrowserRouter } from 'react-router';
import RoutesList from './routes/routesList';

function App() {
  
  return (
    <BrowserRouter>
    <RoutesList></RoutesList>
    </BrowserRouter>
  )
}

export default App
