import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { MoviesCard } from "../components/MovieCard";
import axios from "axios";
import React from "react";
import { LanguageContext } from "../LanguageContext";
import { appItems } from "../services/config";

export const MoviesSearch = () => {
  const { language } = useContext(LanguageContext);
  const [items, setItems] = useState(
    appItems[language.substring(0, 2).toLowerCase()],
  );
  const { query } = useParams();
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);
  const [searchText, setSearchText] = useState(query || "");

  useEffect(() => {
    setItems(appItems[language.substring(0, 2).toLowerCase()]);
    document.documentElement.dir = language.startsWith("ar") ? "rtl" : "ltr";
  }, [language]);

  useEffect(() => {
    if (!query) {
      setMovies([]);
      return;
    }

    const options = {
      method: "GET",
      url: "https://api.themoviedb.org/3/search/movie",
      params: {
        query: query,
        include_adult: "false",
        language: language,
      },
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwYzc5ZmViNzNmOTdlOTcyMjhjYTdlM2E4N2YwZmZjYyIsIm5iZiI6MTc0NjgxNjcwOS43NTUsInN1YiI6IjY4MWU0ZWM1OThjNmU1OWFkZjM0OGRkMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.2Oc3iu5fKvJqr1U-xWZqwTWB1UVedsSeUhGLPwMCRuw",
      },
    };

    axios
      .request(options)
      .then((res) => {
        console.log(res.data);
        setMovies(res.data.results || []);
      })
      .catch((error) => {
        console.error("Error fetching search results:", error);
        setMovies([]);
      });
  }, [query, language]);

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchText(value);

    if (value.trim()) {
      navigate(`/search/${value.trim()}`);
    } else {
      navigate("/search/");
    }
  };

  return (
    <div className="container">
      <div className="d-flex gap-2 align-items-center mt-3 w-100">
        <input
          type="text"
          className="form-control me-2"
          placeholder={items.searchDescription}
          value={searchText}
          onChange={handleChange}
          onFocus={() => navigate("/search/")}
          style={{ flexGrow: 1, marginRight: "10px" }} // Make input take full width
        />
        <button
          onClick={() => navigate(`/search/${searchText.trim()}`)}
          className="btn"
          style={{
            borderRadius: "5px",
            background: "#FFE353",
            color: "#000000",
            fontWeight: "bold",
            width: "auto", // Button size is based on content
            flexShrink: 0, // Prevent shrinking of the button
          }}
        >
          {items.search}
        </button>
      </div>

      {/* Display Search Results */}
      {query && (
        <h5 className="fs-6 m-3">
          <strong>{items.searching}</strong>: {query}
        </h5>
      )}

      {/* Movie Cards */}
      <div className="row g-4 mt-3">
        {movies.length > 0 ? (
          movies.map((movie) => <MoviesCard movie={movie} key={movie.id} />)
        ) : (
          <p>{items.noResults}</p>
        )}
      </div>
    </div>
  );
};
