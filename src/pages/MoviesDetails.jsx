import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ToggleFavorite, ToggleWatching } from "../Store/movieSlice";
import { FaHeart } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import { Recommendation } from "../components/Recommendation";
import axios from "axios";


export default function MoviesDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const dispatch = useDispatch();

  const favorites = useSelector((state) => state.movieData.favorites);
  const watching = useSelector((state) => state.movieData.watching);

  const isFavorited = favorites.includes(Number(id));
  const isWatching = watching.includes(Number(id));

  const handleFavoriteClick = () => {
    dispatch(ToggleFavorite(Number(id)));
  };

  const handleWatchClick = () => {
    dispatch(ToggleWatching(Number(id)));
  };

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${id}?api_key=0c79feb73f97e97228ca7e3a87f0ffcc`
      )
      .then((res) => {
        setMovie(res.data);
      })
      .catch((err) => console.error("Error fetching movie:", err));
  }, [id]);

  if (!movie) return <div className="text-center mt-5">Loading...</div>;

  return (
    <div className="container-md p-2">
      <div className="row mx-auto border-bottom my-5 pb-3" style={{ width: "95%" }}>
        <div className="col-md-3">
          <img
            src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
            className="w-100 rounded-5"
            alt={movie.original_title}
          />
        </div>
        <div className="col-md-9">
          <div className="ps-3">
            <h1 className="mb-0" style={{ fontSize: "48px", color: "#000000" }}>
              {movie.original_title}
            </h1>
            <span style={{ fontSize: "12px", color: "#858585" }}>
              {new Date(movie.release_date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
              })}
            </span>
            <p>
              Rating: {"⭐".repeat(Math.round(movie.vote_average / 2))} (
              {movie.vote_average.toFixed(1)})
            </p>
            <p className="mt-3" style={{ fontSize: "24px", color: "#000000" }}>
              {movie.overview}
            </p>

            <ul className="my-3 d-flex flex-wrap ps-0" style={{ listStyleType: "none" }}>
              {movie.genres?.map((genre, index) => (
                <li key={genre.id} className={index !== 0 ? "ms-2" : ""}>
                  <button
                    className="btn rounded-pill"
                    style={{
                      fontSize: "1rem",
                      color: "#000000",
                      backgroundColor: "#FFE353",
                    }}
                  >
                    {genre.name}
                  </button>
                </li>
              ))}
            </ul>

            <div className="my-3 d-flex align-items-center gap-3">
              <button
                className="btn btn-sm rounded-pill"
                onClick={handleWatchClick}
                style={{
                  backgroundColor: isWatching ? "#FFE353" : "#FFE353",
                  fontWeight: "bold",
                  fontSize: "1rem",
                  color: "#000000",
                }}
              >
                {isWatching ? "Watching..." : "Watch"}
              </button>

              <FaHeart
                onClick={handleFavoriteClick}
                style={{
                  cursor: "pointer",
                  color: isFavorited ? "red" : "#999",
                  fontSize: "1.7rem",
                  transition: "color 0.3s",
                }}
                title={isFavorited ? "Remove from Favorites" : "Add to Favorites"}
              />
            </div>

            <div className="d-flex justify-content-between align-items-center flex-wrap w-50">
              <div>
                <h5 style={{ fontSize: "1rem", fontWeight: "700", color: "#000000" }}>
                  Duration:{" "}
                  <span style={{ fontWeight: "400" }}>{movie.runtime} Min</span>
                </h5>
              </div>
              <div>
                <h5 style={{ fontSize: "1rem", fontWeight: "700", color: "#000000" }}>
                  Languages:{" "}
                  <span style={{ fontWeight: "400" }}>
                    {movie.spoken_languages?.[0]?.name || "N/A"}
                  </span>
                </h5>
              </div>
            </div>

            {movie.production_companies?.[0]?.logo_path && (
              <div>
                <img
                  src={`https://image.tmdb.org/t/p/w500/${movie.production_companies[0].logo_path}`}
                  alt="Production logo"
                  className="my-3"
                  style={{
                    width: "80%",
                    maxWidth: "100px",
                    height: "auto",
                    objectFit: "contain",
                  }}
                />
              </div>
            )}

            <button
              className="btn rounded-pill"
              style={{
                fontSize: "1rem",
                color: "#000000",
                border: "solid 1px #FFE353",
              }}
              onClick={() => window.open(movie.homepage, "_blank")}
              disabled={!movie.homepage}
            >
              {movie.homepage ? "Website" : "No Website"}
            </button>
          </div>
        </div>
      </div>
      <Recommendation movieId={id} />
    </div>
  );
}
