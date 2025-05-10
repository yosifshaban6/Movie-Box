import { BrowserRouter, Route, Routes } from "react-router";
import { MoviesList } from "../pages/moviesList";
export default function RoutesList () { 
    return(
            <Routes>
                <Route path="/" element={<MoviesList/>}></Route>
            </Routes>

    )


}