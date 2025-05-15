import React, { useState, useEffect, useContext } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ToggleFavorite, ToggleWatching } from "../Store/movieSlice";
import { FaHeart } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import { Recommendations } from "../components/Recommendations";
import axios from "axios";
import { LanguageContext } from "../LanguageContext";
import { appItems } from "../services/config";

export const MoviesDetails = () => {
  const { language } = useContext(LanguageContext);
  const [items, setItems] = useState(
    appItems[language.substring(0, 2).toLowerCase()],
  );
  const [movie, setMovie] = useState();
  const { id } = useParams();
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
    setItems(appItems[language.substring(0, 2).toLowerCase()]);

    const options = {
      method: "GET",
      params: { language: language },
      url: `https://api.themoviedb.org/3/movie/${id}`,
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwYzc5ZmViNzNmOTdlOTcyMjhjYTdlM2E4N2YwZmZjYyIsIm5iZiI6MTc0NjgxNjcwOS43NTUsInN1YiI6IjY4MWU0ZWM1OThjNmU1OWFkZjM0OGRkMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.2Oc3iu5fKvJqr1U-xWZqwTWB1UVedsSeUhGLPwMCRuw",
      },
    };

    axios
      .request(options)
      .then((res) => {
        setMovie(res.data);
      })
      .catch((err) => console.error("Error fetching movie:", err));
  }, [movie, language]);

  if (!movie) return <div className="text-center mt-5">Loading...</div>;

  return (
    <div className="container-md p-2">
      <div
        className="row mx-auto border-bottom my-5 pb-3"
        style={{ width: "95%" }}
      >
        <div className="col-md-3">
          <img
            src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
            className="w-100 rounded-5"
            alt={movie.title}
          />
        </div>
        <div className="col-md-9">
          <div className="ps-3">
            <h1 className="mb-0" style={{ fontSize: "48px", color: "#000000" }}>
              {movie.title}
            </h1>
            <span style={{ fontSize: "12px", color: "#858585" }}>
              {new Date(movie.release_date).toLocaleDateString(language, {
                month: "short",
                day: "2-digit",
                year: "numeric",
              })}
            </span>
            <p>
              {items.rating}: {"⭐".repeat(Math.round(movie.vote_average / 2))}{" "}
              ({movie.vote_average.toFixed(1)})
            </p>
            <p className="mt-3" style={{ fontSize: "18px", color: "#000000" }}>
              {movie.overview}
            </p>

            <ul
              className="d-flex flex-warp gap-2 m-0 p-0"
              style={{ listStyleType: "none" }}
            >
              {movie.genres?.map((genre, index) => (
                <li key={genre.id}>
                  <div
                    className="px-3 py-1 rounded-5"
                    style={{
                      fontSize: "1rem",
                      color: "#000000",
                      backgroundColor: "#FFE353",
                    }}
                  >
                    {genre.name}
                  </div>
                </li>
              ))}
            </ul>

            <div className="my-3 mx-0 d-flex p-0 gap-3 align-items-center">
              <button
                className="btn rounded-pill"
                onClick={handleWatchClick}
                style={{
                  backgroundColor: "#FFE353",
                }}
              >
                {isWatching ? items.watching : items.addToWatchList}
              </button>

              <FaHeart
                onClick={handleFavoriteClick}
                style={{
                  cursor: "pointer",
                  color: isFavorited ? "red" : "#999",
                  fontSize: "1.7rem",
                  transition: "color 0.3s",
                }}
                title={
                  isFavorited ? "Remove from Favorites" : "Add to Favorites"
                }
              />
            </div>

            <div className="d-flex justify-content-between align-items-center flex-wrap w-50">
              <div>
                <h5
                  style={{
                    fontSize: "1rem",
                    fontWeight: "700",
                    color: "#000000",
                  }}
                >
                  {`${items.duration}: `}
                  <span
                    style={{ fontWeight: "400" }}
                  >{`${movie.runtime} Min`}</span>
                </h5>
              </div>
              <div>
                <h5
                  style={{
                    fontSize: "1rem",
                    fontWeight: "700",
                    color: "#000000",
                  }}
                >
                  {`${items.realLanguage}: `}
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
      <Recommendations movieId={id} />
    </div>
  );
};
