import { Routes, Route } from "react-router";
import { MoviesList } from "../pages/moviesList";
import { MoviesSearch } from "../pages/moviesSearch"; // Make sure it's imported

export default function RoutesList() {
  return (
    <Routes>
      <Route path="/" element={<MoviesList />} />
      <Route path="/search/:query" element={<MoviesSearch />} />
      <Route path="/search/" element={<MoviesSearch />} /> 
    </Routes>
  );
}
