import { Routes, Route } from "react-router-dom";
import React from 'react';
import { MoviesList } from "../pages/moviesList";
import Favorites from "../pages/Favorites";
import Watching from "../pages/Watching";
import { SeriesList } from "../pages/SeriesList";



export default function RoutesList() {
  return (
    <Routes>
      <Route path="/" element={<MoviesList />} />
      <Route path="/favorites" element={<Favorites />} />
      <Route path="/watching" element={<Watching />} />
      <Route path="/series" element={<SeriesList />}/>
    </Routes>
  );
}
