import { Routes, Route } from "react-router-dom";
import { MoviesList } from "../pages/moviesList";
import Favorites from "../pages/Favorites";
import Watched from "../pages/Watched";
import Watching from "../pages/Watching";



export default function RoutesList() {
  return (
    <Routes>
      <Route path="/" element={<MoviesList />} />
      <Route path="/favorites" element={<Favorites />} />
      <Route path="/watched" element={<Watched />} />
      <Route path="/watching" element={<Watching />} />
    </Routes>
  );
}
