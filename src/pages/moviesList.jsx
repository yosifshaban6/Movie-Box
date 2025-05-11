import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { MoviesCard } from "../components/moviesCard";
import axios from "axios";

export const MoviesList = () => {
  const [movies, setMovies] = useState([]);
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("https://api.themoviedb.org/3/movie/now_playing?api_key=0c79feb73f97e97228ca7e3a87f0ffcc")
      .then((res) => setMovies(res.data.results));
  }, []);

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchText(value);
    if (value.trim()) {
      navigate(`/search/${value.trim()}`);
    }
  };

  const handleFocus = () => {
    navigate("/search/");
  };

  return (
    <div className="container py-3">
      <input
        type="text"
        className="form-control mb-4"
        placeholder="Search movies..."
        value={searchText}
        onChange={handleChange}
        onFocus={handleFocus} 
      />

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
