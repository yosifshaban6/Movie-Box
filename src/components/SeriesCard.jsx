import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { FaHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  ToggleFavorite as ToggleSeriesFavorite,
  RemoveFromFavorites as RemoveSeriesFavorite,
  ToggleWatching as ToggleSeriesWatching
} from "../Store/seriesSlice";

export const SeriesCard = ({ show, page, layout }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const favorites = useSelector((state) => state.seriesData.favorites || []);
  const watching = useSelector((state) => state.seriesData.watching || []);

  const isFavorited = favorites.includes(show.id);
  const isWatching = watching.includes(show.id);

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    dispatch(ToggleSeriesFavorite(show.id));
  };

  const handleWatchClick = (e) => {
    e.stopPropagation();
    dispatch(ToggleSeriesWatching(show.id));
  };

  const handleCardClick = () => {
    navigate(`/SeriesDetails/${show.id}`);
  };

  const getRatingColor = (rating) => {
    if (rating >= 8) return "#1db954";
    if (rating >= 7) return "#f5c518";
    return "#e50914";
  };

  if (layout === "horizontal") {
    return (
      <Card
        className="d-flex flex-row shadow-sm mb-3"
        style={{ borderRadius: "12px", overflow: "hidden", cursor: "pointer", height: "220px" }}
        onClick={handleCardClick}
      >
        <Card.Img
          variant="left"
          src={`https://image.tmdb.org/t/p/w500/${show.poster_path}`}
          style={{ width: "160px", objectFit: "cover" }}
        />
        <Card.Body className="d-flex flex-column justify-content-between p-3">
          <div>
            <Card.Title>{show.name}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted" style={{ fontSize: "14px" }}>
              {show.first_air_date}
            </Card.Subtitle>
            <Card.Text style={{ fontSize: "14px", color: "#444" }}>
              {show.overview?.slice(0, 120)}...
            </Card.Text>
          </div>
          <div className="d-flex align-items-center justify-content-between mt-2">
            <FaHeart
              onClick={handleFavoriteClick}
              style={{
                color: isFavorited ? "gold" : "#ccc",
                cursor: "pointer",
                fontSize: "18px"
              }}
            />
            <Button
              variant={isWatching ? "success" : "warning"}
              onClick={handleWatchClick}
              className="text-white fw-bold"
            >
              {isWatching ? "Watching" : "Watch"}
            </Button>
          </div>
        </Card.Body>
      </Card>
    );
  }

  // Default vertical layout
  return (
    <Card
      className="movie-card border-0 shadow-sm"
      onClick={handleCardClick}
      style={{
        cursor: "pointer",
        borderRadius: "10px",
        overflow: "hidden",
        position: "relative",
        height :"370px"
      }}
    >
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
      <Card.Img
        variant="top"
        src={`https://image.tmdb.org/t/p/w500/${show.poster_path}`}
        style={{  borderRadius: "10px", height: "300px", objectFit: "cover" }}
      />
      <div
        style={{
          position: "absolute",
          top: "10px",
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
      <Card.Body className="p-2">
        <Card.Title className="mb-1" style={{ fontSize: "16px" }}>
          {show.name}
        </Card.Title>
        <div
          className="d-flex align-items-center justify-content-between"
          style={{ fontSize: "13px", color: "#555" }}
        >
          <span>{show.first_air_date}</span>
          <FaHeart
            onClick={handleFavoriteClick}
            style={{
              color: isFavorited ? "gold" : "#ccc",
              cursor: "pointer",
              transition: "color 0.3s",
            }}
          />
        </div>
      </Card.Body>
    </Card>
  );
};
