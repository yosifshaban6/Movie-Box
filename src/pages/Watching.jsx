import { useSelector } from 'react-redux';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { MoviesCard } from '../components/moviesCard';
import { SeriesCard } from '../components/SeriesCard';
import React from 'react';
import { useNavigate } from 'react-router-dom';  // useNavigate for React Router v6

const Watching = () => {
  const watching = useSelector(state => state.movieData.watching || []);
  const allMovies = useSelector(state => state.movieData.bannerData || []);
  const watchingMovies = allMovies.filter(movie => watching.includes(movie.id));

  const allSeries = useSelector((state) => state.seriesData.bannerData || []);
  const seriesWatching = useSelector((state) => state.seriesData.watching || []);
  const watchingSeries = allSeries.filter((series) => seriesWatching.includes(series.id));

  const hasWatching = watchingMovies.length > 0 || watchingSeries.length > 0;
  
  const navigate = useNavigate();  // Using useNavigate for React Router v6

  const goHome = () => {
    navigate('/');  // Redirect to the home page
  };

  return (
    <Container className="py-4">
      <h2 className="mb-4">Watching Movies</h2>

      {hasWatching ? (
        <>
          {/* Watching Movies */}
          {watchingMovies.length > 0 && (
            <>
              <h4 className="mb-3">Movies</h4>
              <Row>
                {watchingMovies.map(movie => (
                  <Col key={movie.id} md={4} className="mb-4">
                    <MoviesCard movie={movie} page="watching" />
                  </Col>
                ))}
              </Row>
            </>
          )}

          {/* Watching Series */}
          {watchingSeries.length > 0 && (
            <>
              <h4 className="mb-3 mt-4">Series</h4>
              <Row>
                {watchingSeries.map(series => (
                    <SeriesCard show={series} page="watching" />
                ))}
              </Row>
            </>
          )}
        </>
      ) : (
        <div className="d-flex flex-column align-items-center justify-content-center" style={{ minHeight: '60vh' }}>
          <img src="/1.png" alt="No movies or series being watched" className="mb-4" style={{ Width: '300px', height: '200px' }} />
          <Button onClick={goHome} variant="" style={{background:"#FFE353"}}>Back to Home</Button>
        </div>
      )}
    </Container>
  );
};

export default Watching;
