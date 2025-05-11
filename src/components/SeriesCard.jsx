import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { FaHeart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { ToggleFavorite, ToggleWatching, RemoveFromFavorites } from "../Store/seriesSlice";

export const SeriesCard = (props) => {
  const { show, page } = props;
  const dispatch = useDispatch();

  const favorites = useSelector((state) => state.seriesData?.favorites || []);
  const watching = useSelector((state) => state.seriesData.watching);

  const isFavorited = favorites.includes(show.id);
  const isWatching = watching.includes(show.id);

  const handleFavoriteClick = () => {
    dispatch(ToggleFavorite(show.id));
  };

  const handleWatchClick = () => {
    dispatch(ToggleWatching(show.id)); 
  };

  const handleDeleteFavorite = () => {
    dispatch(RemoveFromFavorites(show.id));
  };

  return (
    <Card className="h-100 flex-column d-flex carditem">
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
            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
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
