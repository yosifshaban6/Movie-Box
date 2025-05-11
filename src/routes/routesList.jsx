import { Route, Routes } from "react-router";
import { MoviesList } from "../pages/moviesList";
import { MoviesSearch } from "../pages/moviesSearch"; // Make sure it's imported
import { MoviesDetails } from "../pages/MoviesDetails";
import { SeriesList } from "../pages/SeriesList";

export const RoutesList = () => {
  return (
    <Routes>
      <Route path="/" element={<MoviesList />} />
      <Route path="/search/:query" element={<MoviesSearch />} />
      <Route path="/MoviesDetails/:id" element={<MoviesDetails />}></Route>
      <Route path="/search/" element={<MoviesSearch />} />
      <Route path="/series" element={<SeriesList />}></Route>
    </Routes>
  );
};
