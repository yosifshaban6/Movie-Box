import { useSelector } from "react-redux";
import { ImHeartBroken } from "react-icons/im";
import { Container, Row, Col, Button } from "react-bootstrap";
import { MoviesCard } from "../components/MovieCard";
import { SeriesCard } from "../components/SeriesCard";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom"; // useNavigate for React Router v6
import { LanguageContext } from "../LanguageContext";
import { appItems } from "../services/config";

export const Favorites = () => {
  const { language } = useContext(LanguageContext);
  const [items, setItems] = useState(
    appItems[language.substring(0, 2).toLowerCase()],
  );
  const favorites = useSelector((state) => state.movieData.favorites || []);
  const allMovies = useSelector((state) => state.movieData.bannerData || []);
  const favoriteMovies = allMovies.filter((movie) =>
    favorites.includes(movie.id),
  );

  const allSeries = useSelector((state) => state.seriesData.bannerData || []);
  const seriesFavorites = useSelector(
    (state) => state.seriesData.favorites || [],
  );
  const favoriteSeries = allSeries.filter((series) =>
    seriesFavorites.includes(series.id),
  );

  const hasFavorites = favoriteMovies.length > 0 || favoriteSeries.length > 0;

  const navigate = useNavigate(); // Using useNavigate instead of useHistory

  const goHome = () => {
    navigate("/"); // Redirect to the home page
  };

  return (
    <Container className="py-4">
      <h2 className="mb-4">{items.favorites}</h2>

      {hasFavorites ? (
        <>
          {/* Favorite Movies */}
          {favoriteMovies.length > 0 && (
            <>
              <h4 className="mb-3">Movies</h4>
              <Row>
                {favoriteMovies.map((movie) => (
                  <Col key={movie.id} md={12} className="mb-4">
                    <MoviesCard
                      movie={movie}
                      page="favorites"
                      layout="horizontal"
                    />
                  </Col>
                ))}
              </Row>
            </>
          )}
          {/* Favorite Series */}
          {favoriteSeries.length > 0 && (
            <>
              <h4 className="mb-3 mt-4">Series</h4>
              <Row>
                {favoriteSeries.map((series) => (
                  <Col key={series.id} md={12} className="mb-4">
                    <SeriesCard
                      show={series}
                      page="favorites"
                      layout="horizontal"
                    />
                  </Col>
                ))}
              </Row>
            </>
          )}
        </>
      ) : (
        <div
          className="d-flex flex-column align-items-center justify-content-center"
          style={{ minHeight: "60vh" }}
        >
          <div className="mb-4" style={{ fontSize: "8rem", color: "#ccc" }}>
            <span role="img" aria-label="broken-heart">
              <ImHeartBroken />
            </span>{" "}
          </div>
          <Button onClick={goHome} variant="" style={{ background: "#FFE353" }}>
            {items.backToHomePage}
          </Button>
        </div>
      )}
    </Container>
  );
};
