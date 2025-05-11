import { useEffect, useState } from "react";
import { MoviesCard } from "./moviesCard";
import axios from "axios";

export const Recommendation = ({ movieId }) => {
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
        className="carousel slide"
        data-bs-ride="carousel"
      >
        <div className="carousel-inner">
          {groupedMovies.map((group, idx) => (
            <div
              key={idx}
              className={`carousel-item ${idx === 0 ? "active" : ""}`}
            >
              <div className="row g-3 justify-content-center">
                {group.map((movie) => (
                  <div
                    key={movie.id}
                    className="col-6 col-md-4 col-lg-2 d-flex"
                  >
                    <MoviesCard movie={movie} />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {groupedMovies.length > 1 && (
          <>
            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#recommendationCarousel"
              data-bs-slide="prev"
            >
              <span
                style={{
                  color: "black",
                  fontSize: "50px",
                  marginRight: "50px",
                }}
              >
                &#11164;
              </span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#recommendationCarousel"
              data-bs-slide="next"
            >
              <span
                style={{
                  color: "black",
                  fontSize: "50px",
                  marginLeft: "50px",
                }}
              >
                &#11166;
              </span>
            </button>
          </>
        )}
      </div>
    </div>
  );
};
