import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { FaHeart } from "react-icons/fa";
import { useState } from "react";

export const MoviesCard = (props) => {
  const { movie } = props;
  const [isFavorited, setIsFavorited] = useState(false);

  const handleFavoriteClick = () => {
    setIsFavorited(!isFavorited);
  };

  const votePercentage = (movie.vote_average || 0) * 10;

  const getStrokeColor = (percentage) => {
    if (percentage >= 70) return "#2ecc71"; 
    if (percentage >= 40) return "#f39c12"; 
    return "#e74c3c"; 
  };

  return (
    <Card className="h-100 flex-column d-flex carditem border-0 position-relative">
      <div style={{ position: "relative" }}>
        <Card.Img
          variant="top"
          src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-15px",
            left: "2px",
            width: "40px",
            height: "40px",
          }}
        >
          <svg width="40" height="40">
          <circle
              cx="20"
              cy="20"
              r="18"
              stroke="#e0e0e0"
              strokeWidth="4"
              fill="none"
            />
            <circle
              cx="20"
              cy="20"
              r="18"
              stroke={getStrokeColor(votePercentage)}
              strokeWidth="4"
              fill="none"
              strokeDasharray="113"
              strokeDashoffset={113 - (113 * votePercentage) / 100}
              transform="rotate(-90 20 20)"
            />
           
          </svg>
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              fontSize: "12px",
              fontWeight: "bold",
              color: "white",
            }}
          >
            {Math.round(votePercentage)}%
          </div>
        </div>
      </div>

      <Card.Body className="d-flex flex-column justify-content-between">
        <Card.Title className="fs-6 fw-bold">{movie.title}</Card.Title>
        <Card.Text>
          <span style={{ fontSize: "18px", color: "#858585" }}>
            {new Date(movie?.release_date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
            })}
          </span>
        </Card.Text>
        <div className="container">
          <Button
            className="btn-sm px-3 py-1 rounded-4 shadow-sm fw-bold text-uppercase border-0"
            style={{
              background: "linear-gradient(135deg, white, yellow)",
              color: "black",
              transition: "transform 0.2s ease-in-out",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "scale(1.05)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.transform = "scale(1)")
            }
          >
            Watch
          </Button>
          <FaHeart
            className="ms-4 heart-icon"
            onClick={handleFavoriteClick}
            style={{
              marginRight: "5px",
              color: isFavorited ? "green" : "black",
              transition: "color 0.3s, border-color 0.3s",
            }}
          />
        </div>
      </Card.Body>
    </Card>
  );
};
