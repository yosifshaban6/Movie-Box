import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { FaHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RiHeart3Fill } from "react-icons/ri";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import {
  ToggleFavorite as ToggleSeriesFavorite,
  RemoveFromFavorites as RemoveSeriesFavorite,
  ToggleWatching as ToggleSeriesWatching,
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
        style={{
          borderRadius: "12px",
          overflow: "hidden",
          cursor: "pointer",
          height: "220px",
        }}
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
            <Card.Subtitle
              className="mb-2 text-muted"
              style={{ fontSize: "14px" }}
            >
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
                fontSize: "18px",
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
    show.poster_path && (
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
            src={`https://image.tmdb.org/t/p/w500/${show.poster_path}`}
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
            value={show.popularity?.toFixed()}
            text={`${show.popularity?.toFixed()}%`}
            background
            backgroundPadding={6}
            styles={buildStyles({
              backgroundColor: "#081c22",
              textColor: "#fff",
              pathColor:
                show.popularity?.toFixed() > 100
                  ? "green"
                  : show.popularity?.toFixed() > 50
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
          <Card.Title className=" fw-bolder fs-6 mb-1">{show.name}</Card.Title>
          <Card.Text
            className="m-0"
            style={{
              fontSize: "12px",
            }}
          >
            {new Date(show.first_air_date).toLocaleDateString("en-US", {
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
