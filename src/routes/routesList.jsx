import { Route, Routes } from "react-router";
import { MoviesList } from "../pages/moviesList";
import { SeriesList } from "../pages/SeriesList";
export default function RoutesList() {
  return (
    <Routes>
      <Route path="/" element={<MoviesList />}></Route>
      <Route path="/s" element={<SeriesList />}></Route>
    </Routes>
  );
}
