import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { FaHeart } from "react-icons/fa";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const MoviesCard = (props) => {
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
    <Card className="h-100 flex-column d-flex">
      <Card.Img
        variant="top"
        src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
      />
      <Card.Body className="d-flex flex-column justify-content-between">
        <Card.Title>{movie.title}</Card.Title>
        <Card.Text></Card.Text>
        <div className="container">
          <Button
          onClick={() => handleCardClick(movie.id)}
            className="btn-sm px-3 py-1 rounded-4 shadow-sm fw-bold text-uppercase border-0"
            style={{
              background: "linear-gradient(135deg, #007bff, #0056b3)",
              color: "#fff",
              transition: "transform 0.2s ease-in-out",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "scale(1.05)")
            }
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            Watch
          </Button>
          <FaHeart
              className="ms-4 heart-icon "
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
