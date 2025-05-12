import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { FaHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import React from 'react';

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

  return (
    <Card
      className="h-100 flex-column d-flex carditem"
      onClick={handleCardClick}
      style={{ cursor: "pointer" }}
    >
      <Card.Img
        variant="top"
        src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
      />
      <Card.Body className="d-flex flex-column justify-content-between">
        <Card.Title>{movie.title}</Card.Title>

        <div className="container">
          <Button
            className="btn-sm px-3 py-1 rounded-4 shadow-sm fw-bold text-uppercase border-0"
            style={{
              background: "linear-gradient(135deg, #007bff, #0056b3)",
              color: "#fff",
              transition: "transform 0.2s ease-in-out",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "scale(1.05)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.transform = "scale(1)")
            }
            onClick={handleWatchClick}
          >
            {isWatching ? "Watching..." : "Watch"}
          </Button>

          <FaHeart
            className="ms-4 heart-icon"
            onClick={handleFavoriteClick}
            style={{
              marginRight: "5px",
              color: isFavorited ? "green" : "black",
              transition: "color 0.3s, border-color 0.3s",
              cursor: "pointer",
            }}
          />

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
