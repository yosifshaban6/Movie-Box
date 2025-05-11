import { BrowserRouter, Route, Routes } from "react-router";
import { MoviesList } from "../pages/moviesList";
import  MoviesDetails  from "../pages/MoviesDetails";
export default function RoutesList () { 
    return(
            <Routes>
                <Route path="/" element={<MoviesList/>}></Route>
                <Route path="/MoviesDetails/:id" element={<MoviesDetails/>}></Route>
            </Routes>

    )


}