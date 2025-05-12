import { useState } from "react";
import { useNavigate } from "react-router";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { RiHeart3Fill } from "react-icons/ri";

export const MovieCard = (props) => {
  const { movie } = props;
  const [isFavorited, setIsFavorited] = useState(false);
  const navigate = useNavigate();
  const handleCardClick = (id) => {
    navigate(`/MoviesDetails/${movie.id}`);
  };

  const handleFavoriteClick = () => {
    setIsFavorited(!isFavorited);
  };

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
          onClick={(e) => {
            e.stopPropagation();
            handleFavoriteClick();
          }}
          style={{
            top: "10px",
            right: "10px",
          }}
        >
          <RiHeart3Fill
            style={{
              color: isFavorited ? "rgb(233, 54, 22)" : "rgba(158, 158, 158, 0.822)",
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
