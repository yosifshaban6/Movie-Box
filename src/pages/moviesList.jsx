import { useEffect, useState } from "react";
import { axiosInstance } from "../apis/config";
import { MoviesCard } from "../components/moviesCard";
import { useDispatch } from "react-redux";
import { SetBannerData } from "../Store/movieSlice";

export const MoviesList = () => {
  const [movies, setMovies] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    axiosInstance   
      .get("/now_playing?api_key=0c79feb73f97e97228ca7e3a87f0ffcc")
      .then((res) => {
        if (res?.data?.results?.length) {
          setMovies(res.data.results);
          dispatch(SetBannerData(res.data.results));
        } else {
          setMovies([]);
        }
      })
      .catch((error) => {
        console.error("Error fetching movies:", error);
        setMovies([]);
      });
  }, []);


  return (
    <div className="container">
      <div className="row g-4">
        {movies.map((movie) => (
          <div className="col-lg-2 d-flex" key={movie.id}>
            <div className="w-100 h-100">
              <MoviesCard movie={movie} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
