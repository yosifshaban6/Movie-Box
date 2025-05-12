import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { FaHeart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import React from 'react';
import { ToggleFavorite, ToggleWatching, RemoveFromFavorites } from "../Store/seriesSlice";

export const SeriesCard = (props) => {
  const { show, page } = props;
  const dispatch = useDispatch();

  const favorites = useSelector((state) => state.seriesData?.favorites || []);
  const watching = useSelector((state) => state.seriesData.watching);

  const isFavorited = favorites.includes(show.id);
  const isWatching = watching.includes(show.id);

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    dispatch(ToggleFavorite(show.id));
  };

  const handleWatchClick = (e) => {
    e.stopPropagation();
    dispatch(ToggleWatching(show.id));
  };

  const handleDeleteFavorite = (e) => {
    e.stopPropagation();
    dispatch(RemoveFromFavorites(show.id));
  };

  const getRatingColor = (rating) => {
    if (rating >= 8) return "#1db954";
    if (rating >= 7) return "#f5c518";
    return "#e50914";
  };

  return (
    <Card
      className="series-card border-0 shadow-sm"
      onClick={() => handleCardClick(show.id)}
      style={{
        cursor: "pointer",
        borderRadius: "10px",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Three Dots Menu Icon */}
      <div
        style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          zIndex: 1,
          backgroundColor: "#ffffffcc",
          borderRadius: "50%",
          width: "24px",
          height: "24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontWeight: "bold",
        }}
      >
        ...
      </div>

      {/* Poster Image */}
      <Card.Img
        variant="top"
        src={`https://image.tmdb.org/t/p/w500${show.poster_path}`}
        style={{ borderRadius: "10px", height: "300px", objectFit: "cover" }}
      />

      {/* Circular Rating */}
      <div
        style={{
          position: "absolute",
          bottom: "60px",
          left: "10px",
          backgroundColor: "rgb(0,0,0,.85)",
          color: "#fff",
          fontWeight: "bold",
          padding: "5px 10px",
          borderRadius: "50%",
          fontSize: "14px",
          border: `2px solid ${getRatingColor(Math.round(show.vote_average))}`,
          boxShadow: "0 0 6px rgba(0,0,0,0.2)",
        }}
      >
        {show.vote_average ? Math.round(show.vote_average) : "NR"}
      </div>

      {/* Card Body */}
      <Card.Body className="p-2">
        <Card.Title className="mb-1" style={{ fontSize: "16px" }}>
          {show.title}
        </Card.Title>
        <div
          className="d-flex align-items-center justify-content-between"
          style={{ fontSize: "13px", color: "#555" }}
        >
          <span>{show.first_air_date}</span> {/* Series air date */}
          <FaHeart
            onClick={handleFavoriteClick}
            style={{
              color: isFavorited ? "gold" : "#ccc",
              cursor: "pointer",
              transition: "color 0.3s",
            }}
          />
        </div>

        <div className="container mt-2">
          <Button
            className="btn-sm px-3 py-1 rounded-4 shadow-sm fw-bold text-uppercase border-0"
            style={{
              fontSize: "1rem",
              color: "#000000",
              backgroundColor: "#FFE353",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
            onClick={handleWatchClick}
          >
            {isWatching ? "Watching..." : "Watch"}
          </Button>

          {page === "favorites" && (
            <Button
              className="btn-danger btn-sm ms-2"
              onClick={handleDeleteFavorite}
            >
              Remove from Favorites
            </Button>
          )}
        </div>
      </Card.Body>
    </Card>
  );
};
