import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { SetBannerData } from "../Store/movieSlice";
import { MoviesCard } from "../components/MovieCard";
import axios from "axios";
import React from "react";
import "./MoviesList.css";

export const MoviesList = () => {
  const [movies, setMovies] = useState([]);
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get(
        "https://api.themoviedb.org/3/movie/now_playing?api_key=0c79feb73f97e97228ca7e3a87f0ffcc",
      )
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
  }, [dispatch]);

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
      {/* Welcome Section */}
      <div
        className="welcome-section p-4 mb-4"
        style={{ borderRadius: "8px", background: "#e4e0e0" }}
      >
        <h1 className="mt-4">Welcome to Our Movie Box</h1>
        <p>
          Browse and search through a variety of movies from the latest releases
          to the classic hits!
        </p>

        {/* Search Input and Button */}
        <div className="d-flex justify-content-center align-items-center w-100 mt-5">
          <input
            type="text"
            className="form-control me-2"
            placeholder="Search movies..."
            value={searchText}
            onChange={handleChange}
            onFocus={handleFocus}
            style={{ flexGrow: 1, marginRight: "10px" }} // Allow input to take full width
          />
          <button
            onClick={() => navigate(`/search/${searchText.trim()}`)}
            className="btn"
            style={{
              borderRadius: "5px",
              background: "#FFE353",
              color: "#000000",
              fontWeight: "bold",
              width: "auto", // Let button width be content-based
              flexShrink: 0, // Prevent shrinking
            }}
          >
            Search
          </button>
        </div>
      </div>

      {/* Movies List */}
      <div className="row g-4">
        {movies.map((movie) => (
          <MoviesCard movie={movie} key={movie.id}/>
        ))}
      </div>
    </div>
  );
};
