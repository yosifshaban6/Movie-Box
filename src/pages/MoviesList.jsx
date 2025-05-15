import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Pagination from "react-bootstrap/Pagination";
import { SetBannerData } from "../Store/movieSlice";
import { MoviesCard } from "../components/MovieCard";
import axios from "axios";
import React from "react";
import "./MoviesList.css";
import { LanguageContext } from "../LanguageContext";
import { appItems } from "../services/config";

const range = (start, end) => {
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
};

export const MoviesList = () => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const { language } = useContext(LanguageContext);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [items, setItems] = useState(
    appItems[language.substring(0, 2).toLowerCase()],
  );
  const [isRTL, setIsRTL] = useState(document.documentElement.dir === "rtl");

  useEffect(() => {
    setItems(appItems[language.substring(0, 2).toLowerCase()]);
    document.documentElement.dir = language.startsWith("ar") ? "rtl" : "ltr";
    setIsRTL(document.documentElement.dir === "rtl");
  }, [language]);

  useEffect(() => {
    const options = {
      method: "GET",
      url: "https://api.themoviedb.org/3/discover/movie",
      params: {
        include_adult: "false",
        include_video: "false",
        language: language,
        page: page,
        sort_by: "popularity.desc",
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
  }, [dispatch, language, page]);

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

  const handlePageChange = (newPage) => {
    console.log(page);
    setPage(newPage);
    navigate(`/?page=${newPage}`);
  };
  return (
    <div className="container py-3">
      {/* Welcome Section */}
      <div
        className="welcome-section p-4 mb-4"
        style={{ borderRadius: "8px", background: "#e4e0e0" }}
      >
        <h1 className="mt-4 mb-3">{items.welcome}</h1>
        <p>{items.description}</p>

        {/* Search Input and Button */}
        <div className="d-flex justify-content-center align-items-center gap-2 w-100 mt-5">
          <div className="input-group" style={{ flexGrow: 1 }}>
            <input
              type="text"
              className="form-control rounded-1 py-2"
              placeholder={items.searchDescription}
              value={searchText}
              onChange={handleChange}
              onFocus={handleFocus}
              style={{ fontSize: 14 }}
            />
          </div>
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
            {items.search}
          </button>
        </div>
      </div>

      {/* Movies List */}
      <div className="row g-4">
        {movies.map((movie) => (
          <MoviesCard movie={movie} key={movie.id} />
        ))}
      </div>

      {/* Centered Pagination */}
      <div className="d-flex justify-content-center mt-4">
        <Pagination>
          <Pagination.First
            onClick={() => handlePageChange(1)}
            disabled={page === 1}
          />
          <Pagination.Prev
            onClick={() => handlePageChange(Math.max(page - 1, 1))}
            disabled={page === 1}
          />
          {range(Math.max(page), Math.min(20, page + 9)).map(
            (pageNumber) => (
              <Pagination.Item
                key={pageNumber}
                active={pageNumber === page}
                onClick={() => handlePageChange(pageNumber)}
              >
                {pageNumber}
              </Pagination.Item>
            ),
          )}
          <Pagination.Next
            onClick={() => handlePageChange(Math.min(page + 1, 20))}
            disabled={page === 20}
          />
          <Pagination.Last
            onClick={() => handlePageChange(20)}
            disabled={page === 20}
          />
        </Pagination>
      </div>
    </div>
  );
};
