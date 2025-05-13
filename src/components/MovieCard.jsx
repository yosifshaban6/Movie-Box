import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { FaHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RiHeart3Fill } from "react-icons/ri";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import React from "react";
import "./MovieCard.css";

import {
  ToggleFavorite,
  ToggleWatching,
  RemoveFromFavorites,
} from "../Store/movieSlice";

export const MoviesCard = (props) => {
  const { movie, layout } = props;
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

  if (layout === "horizontal") {
    // Horizontal (favorite-page-style) layout
    return (
      <Card
        className="d-flex flex-row shadow-sm p-2"
        onClick={handleCardClick}
        style={{ borderRadius: "15px", cursor: "pointer" }}
      >
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
            <div
              style={{ fontSize: "14px", color: "#888", marginBottom: "4px" }}
            >
              {movie.release_date}
            </div>
            <div className="d-flex align-items-center mb-2">
              <span style={{ color: "#000" }}>
                {"★".repeat(Math.floor(movie.vote_average / 2)) +
                  "☆".repeat(5 - Math.floor(movie.vote_average / 2))}
              </span>
              <span className="ms-2" style={{ color: "#666" }}>
                {movie.vote_count}
              </span>
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
            <Button
              variant="warning"
              onClick={handleWatchClick}
              className="text-white fw-bold"
            >
              {isWatching ? "Watching" : "Watch"}
            </Button>
          </div>
        </div>
      </Card>
    );
  }

  // Default vertical layout
  return (
    movie.poster_path && (
      <Card
        className="position-relative col-md-4 col-lg-2 col-sm-6 p-2 border-0"
        onClick={handleCardClick}
        style={{ cursor: "pointer" }}
      >
        <div
          className="w-100 rounded-3 overflow-hidden"
          style={{ height: "300px" }}
        >
          <Card.Img
            variant="top"
            src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
            className="shadow"
            style={{
              transform: "scale(1)",
              transition: "transform 0.3s ease-in-out",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "scale(1.1)")
            }
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          />
        </div>
        <div
          className="position-absolute"
          style={{
            width: "30px",
            height: "30px",
            top: "290px",
            left: "15px",
          }}
        >
          <CircularProgressbar
            value={movie.popularity.toFixed()}
            text={`${movie.popularity.toFixed()}%`}
            background
            backgroundPadding={6}
            styles={buildStyles({
              backgroundColor: "#081c22",
              textColor: "#fff",
              pathColor:
                movie.popularity.toFixed() > 100
                  ? "green"
                  : movie.popularity.toFixed() > 50
                  ? "yellow"
                  : "red",
              trailColor: "transparent",
            })}
          />
        </div>
        <Button
          variant="none"
          className="border-0 position-absolute p-0"
          onClick={handleFavoriteClick}
          style={{
            top: "10px",
            right: "10px",
          }}
        >
          <RiHeart3Fill
            style={{
              color: isFavorited
                ? "rgb(233, 54, 22)"
                : "rgba(158, 158, 158, 0.822)",
              fontSize: "25px",
            }}
          />
        </Button>
        <Card.Body className="p-0 mt-3">
          <Card.Title className=" fw-bolder fs-6 mb-1">
            {movie.title}
          </Card.Title>
          <Card.Text
            className="m-0"
            style={{
              fontSize: "12px",
            }}
          >
            {new Date(movie.release_date).toLocaleDateString("en-US", {
              month: "short",
              day: "2-digit",
              year: "numeric",
            })}
          </Card.Text>
        </Card.Body>
      </Card>
    )
  );
};
