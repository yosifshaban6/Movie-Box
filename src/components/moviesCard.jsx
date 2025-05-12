import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { FaHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import React from 'react';
import './moviesCard.css'

import {
  ToggleFavorite,
  ToggleWatching,
  RemoveFromFavorites,
} from "../Store/movieSlice";

export const MoviesCard = (props) => {
  const { movie, page } = props;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const favorites = useSelector((state) => state.movieData.favorites);
  const watching = useSelector((state) => state.movieData.watching);

  const isFavorited = favorites.includes(movie.id);
  const isWatching = watching.includes(movie.id);

  const handleFavoriteClick = (e) => {
    e.stopPropagation(); // prevent navigating when clicking the heart
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

  return (
    <Card
      className="movie-card border-0 shadow-sm"
      onClick={handleCardClick}
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
        src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
        style={{ borderRadius: "10px", height: "300px", objectFit: "cover" }}
      />

      {/* Circular Rating */}
      <div
        style={{
          position: "absolute",
          bottom: "60px",
          left: "10px",
          backgroundColor: "rgb(0,0,0,.85)",
          color : "#fff",
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


      {/* Card Body */}
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
