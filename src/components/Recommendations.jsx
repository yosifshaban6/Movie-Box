import { useEffect, useState } from "react";
import { MoviesCard } from "./MovieCard";
import axios from "axios";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

import React from "react";

export const Recommendations = ({ movieId }) => {
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    if (!movieId) return;

    axios
      .get(
        `https://api.themoviedb.org/3/movie/${movieId}/recommendations?api_key=0c79feb73f97e97228ca7e3a87f0ffcc`,
      )
      .then((res) => setRecommendations(res.data.results || []))
      .catch((err) => {
        console.error("Error fetching recommendations:", err);
        setRecommendations([]);
      });
  }, [movieId]);

  if (!recommendations.length) return null;

  const chunkSize = 5;
  const groupedMovies = [];
  for (let i = 0; i < recommendations.length; i += chunkSize) {
    groupedMovies.push(recommendations.slice(i, i + chunkSize));
  }

return (
  <div className="container">
    <h4 className="mb-4">Recommended Movies</h4>
    <div
      id="recommendationCarousel"
      className="carousel slide position-relative" 
      data-bs-ride="carousel"
      style={{ padding: "0 60px" }} 
    >
      <div
        className="carousel-inner"
        style={{ padding: "10px 0" }} 
      >
        {groupedMovies.map((group, idx) => (
          <div
            key={idx}
            className={`carousel-item ${idx === 0 ? "active" : ""}`}
          >
            <div className="row g-3 justify-content-center m-2">
              {group.map((movie) => (
                <MoviesCard movie={movie} key={movie.id} />
              ))}
            </div>
          </div>
        ))}
      </div>

      {groupedMovies.length > 1 && (
        <div className="d-none d-md-block">
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#recommendationCarousel"
            data-bs-slide="prev"
            style={{
              position: "absolute",
              top: "50%",
              left: "10px", 
              transform: "translateY(-50%)",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              borderRadius: "50%",
              width: "50px",
              height: "50px",
              border: "none",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              cursor: "pointer",
              zIndex: 10,
              boxShadow: "0 0 8px rgba(0,0,0,0.3)", 
            }}
          >
            <FaChevronLeft style={{ fontSize: "24px", color: "white" }} />
          </button>

          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#recommendationCarousel"
            data-bs-slide="next"
            style={{
              position: "absolute",
              top: "50%",
              right: "10px", 
              transform: "translateY(-50%)",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              borderRadius: "50%",
              width: "50px",
              height: "50px",
              border: "none",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              cursor: "pointer",
              zIndex: 10,
              boxShadow: "0 0 8px rgba(0,0,0,0.3)", 
            }}
          >
            <FaChevronRight style={{ fontSize: "24px", color: "white" }} />
          </button>
        </div>
      )}
    </div>
  </div>
);

};
