import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { MoviesCard } from "../components/moviesCard";
import axios from "axios";
import React from 'react';

export const MoviesSearch = () => {
  const { query } = useParams();
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);
  const [searchText, setSearchText] = useState(query || "");

  useEffect(() => {
    if (!query) {
      setMovies([]);
      return;
    }
    axios
      .get(`https://api.themoviedb.org/3/search/movie?api_key=0c79feb73f97e97228ca7e3a87f0ffcc&query=${query}`)
      .then((res) => {
        setMovies(res.data.results || []);
      })
      .catch((error) => {
        console.error("Error fetching search results:", error);
        setMovies([]);
      });
  }, [query]);

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchText(value);

    if (value.trim()) {
      navigate(`/search/${value.trim()}`);
    } else {
      navigate("/search/");
    }
  };

  const handleCloseSearch = () => {
    setSearchText("");
    navigate("/"); 
  };

  return (
    <div className="container-fluid py-3">
        <div className="d-flex justify-content-center align-items-center mt-3 w-100">
          <input
            type="text"
            className="form-control me-2"
            placeholder="Search movies..."
            value={searchText}
            onChange={handleChange}
            onFocus={() => navigate("/search/")}
            style={{ flexGrow: 1, marginRight: "10px" }} // Make input take full width
          />
          <button
            onClick={() => navigate(`/search/${searchText.trim()}`)}
            className="btn btn-warning text-white"
            style={{
              borderRadius: "5px",
              fontWeight: "bold",
              width: "auto", // Button size is based on content
              flexShrink: 0, // Prevent shrinking of the button
            }}
          >
            Search
          </button>
        </div>

      {/* Display Search Results */}
      {query && (
        <h4>
          Search Results for: <strong>{query}</strong>
        </h4>
      )}

      {/* Movie Cards */}
      <div className="row g-4 mt-3">
        {movies.length > 0 ? (
          movies.map((movie) => (
            <div className="col-lg-2 d-flex" key={movie.id}>
              <div className="w-100 h-100">
                <MoviesCard movie={movie} />
              </div>
            </div>
          ))
        ) : (
          <p>No results found.</p>
        )}
      </div>
    </div>
  );
};
