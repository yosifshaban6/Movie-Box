import { useSelector } from 'react-redux';
import { Container, Row, Col } from 'react-bootstrap';
import { MoviesCard } from '../components/moviesCard';

const Watching = () => {
  const watching = useSelector(state => state.movieData.watching || []);
  const allMovies = useSelector(state => state.movieData.bannerData || []);
  const watchingMovies = allMovies.filter(movie => watching.includes(movie.id));

  return (
    <Container className="py-4">
      <h2 className="mb-4">Watching Movies</h2>
      <Row>
        {watchingMovies.length > 0 ? (
          watchingMovies.map(movie => (
            <Col key={movie.id} md={4} className="mb-4">
              <MoviesCard movie={movie} page="watching" />
            </Col>
          ))
        ) : (
          <p>No movies are being watched yet.</p>
        )}
      </Row>
    </Container>
  );
};

export default Watching;
