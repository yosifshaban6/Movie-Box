import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { FaHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import React from 'react';
import './moviesCard.css';

import {
  ToggleFavorite,
  ToggleWatching,
  RemoveFromFavorites,
} from "../Store/movieSlice";

export const MoviesCard = (props) => {
  const { movie, page, layout } = props;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const favorites = useSelector((state) => state.movieData.favorites);
  const watching = useSelector((state) => state.movieData.watching);

  const isFavorited = favorites.includes(movie.id);
  const isWatching = watching.includes(movie.id);

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    dispatch(ToggleFavorite(movie.id));
  };

  const handleWatchClick = (e) => {
    e.stopPropagation();
    dispatch(ToggleWatching(movie.id));
  };

  const handleDeleteFavorite = (e) => {
    e.stopPropagation();
    dispatch(RemoveFromFavorites(movie.id));
  };

  const handleCardClick = () => {
    navigate(`/MoviesDetails/${movie.id}`);
  };

  const getRatingColor = (rating) => {
    if (rating >= 8) return "#1db954"; // green
    if (rating >= 7) return "#f5c518"; // yellow-orange
    return "#e50914"; // red
  };

  if (layout === "horizontal") {
    // Horizontal (favorite-page-style) layout
    return (
      <Card className="d-flex flex-row shadow-sm p-2" onClick={handleCardClick} style={{ borderRadius: "15px", cursor: "pointer" }}>
        <Card.Img
          variant="left"
          src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
          style={{ width: "150px", borderRadius: "10px", objectFit: "cover" }}
        />
        <div className="d-flex flex-column justify-content-between ps-3 flex-grow-1">
          <Card.Body className="p-0">
            <Card.Title style={{ fontSize: "22px", fontWeight: "bold" }}>
              {movie.title}
            </Card.Title>
            <div style={{ fontSize: "14px", color: "#888", marginBottom: "4px" }}>{movie.release_date}</div>
            <div className="d-flex align-items-center mb-2">
              <span style={{ color: "#000" }}>
                {"★".repeat(Math.floor(movie.vote_average / 2)) + "☆".repeat(5 - Math.floor(movie.vote_average / 2))}
              </span>
              <span className="ms-2" style={{ color: "#666" }}>{movie.vote_count}</span>
            </div>
            <Card.Text style={{ fontSize: "14px", color: "#444" }}>
              {movie.overview?.slice(0, 150)}...
            </Card.Text>
          </Card.Body>
          <div className="d-flex justify-content-between align-items-center">
            <FaHeart
              onClick={handleFavoriteClick}
              style={{
                color: isFavorited ? "gold" : "#ccc",
                cursor: "pointer",
                fontSize: "20px",
              }}
            />
            <Button variant="warning" onClick={handleWatchClick} className="text-white fw-bold">
              {isWatching ? "Watching" : "Watch"}
            </Button>
          </div>
        </div>
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
        height :"350px"
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
        src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
        style={{ borderRadius: "10px", height: "300px", objectFit: "cover" }}
      />

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
          border: `2px solid ${getRatingColor(Math.round(movie.vote_average))}`,
          boxShadow: "0 0 6px rgba(0,0,0,0.2)",
        }}
      >
        {movie.vote_average ? Math.round(movie.vote_average) : "NR"}
      </div>

      <Card.Body className="p-2">
        <Card.Title className="mb-1" style={{ fontSize: "16px" }}>
          {movie.title}
        </Card.Title>
        <div
          className="d-flex align-items-center justify-content-between"
          style={{ fontSize: "13px", color: "#555" }}
        >
          <span>{movie.release_date}</span>
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
