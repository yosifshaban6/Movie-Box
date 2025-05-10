import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { FaHeart } from "react-icons/fa";
import { useState } from "react";

export const SeriesCard = (props) => {
  const { show } = props;
  const [isFavorited, setIsFavorited] = useState(false);

  const handleFavoriteClick = () => {
    setIsFavorited(!isFavorited);
  };

  return (
    <Card className="h-100 flex-column d-flex carditem" >
      <Card.Img
        variant="top"
        src={`https://image.tmdb.org/t/p/w500${show.poster_path}`}
      />
      <Card.Body className="d-flex flex-column justify-content-between">
        <Card.Title>{show.title}</Card.Title>
        <Card.Text></Card.Text>
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
