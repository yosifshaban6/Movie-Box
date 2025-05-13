import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ToggleFavorite, ToggleWatching } from "../Store/seriesSlice";
import { FaHeart } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import { Recommendation } from "../components/Recommendation";
import axios from "axios";

export const SeriesDetails = () => {
  const { id } = useParams();
  const [series, setseries] = useState(null);
  const dispatch = useDispatch();

  const favorites = useSelector((state) => state.seriesData.favorites);
  const watching = useSelector((state) => state.seriesData.watching);

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
        `https://api.themoviedb.org/3/tv/${id}?api_key=0c79feb73f97e97228ca7e3a87f0ffcc`
      )
      .then((res) => {
        console.log(res.data);
        setseries(res.data);
      })
      .catch((err) => console.error("Error fetching series:", err));
  }, [id]);

  if (!series) return <div className="text-center mt-5">Loading...</div>;

  return (
    <div className="container-md p-2">
      <div
        className="row mx-auto border-bottom my-5 pb-3"
        style={{ width: "95%" }}
      >
        <div className="col-md-3">
          <img
            src={`https://image.tmdb.org/t/p/w500/${series.poster_path}`}
            className="w-100 rounded-5"
            alt={series.original_title}
          />
        </div>
        <div className="col-md-9">
          <div className="ps-3">
            <h1 className="mb-0" style={{ fontSize: "48px", color: "#000000" }}>
              {series.original_title}
            </h1>
            <span style={{ fontSize: "12px", color: "#858585" }}>
              {new Date(series.release_date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
              })}
            </span>
            <p>
              Rating: {"⭐".repeat(Math.round(series.vote_average / 2))} (
              {series.vote_average.toFixed(1)})
            </p>
            <p className="mt-3" style={{ fontSize: "24px", color: "#000000" }}>
              {series.overview}
            </p>

            <ul
              className="my-3 d-flex flex-wrap ps-0"
              style={{ listStyleType: "none" }}
            >
              {series.genres?.map((genre, index) => (
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
                  Duration:{" "}
                  <span style={{ fontWeight: "400" }}>
                    {series.episode_run_time[0]} Min
                  </span>
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
                  Languages:{" "}
                  <span style={{ fontWeight: "400" }}>
                    {series.spoken_languages?.[0]?.name || "N/A"}
                  </span>
                </h5>
              </div>
            </div>

            {series.production_companies?.[0]?.logo_path && (
              <div>
                <img
                  src={`https://image.tmdb.org/t/p/w500/${series.production_companies[0].logo_path}`}
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
              onClick={() => window.open(series.homepage, "_blank")}
              disabled={!series.homepage}
            >
              {series.homepage ? "Website" : "No Website"}
            </button>
          </div>
        </div>
      </div>
      <Recommendation seriesId={id} />
    </div>
  );
};
