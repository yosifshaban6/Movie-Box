import { useSelector } from 'react-redux';
import { Container, Row, Col } from 'react-bootstrap';
import { MoviesCard } from '../components/moviesCard';

const Watched = () => {
    const watched = useSelector(state => state.movieData.watched || []);
    const allMovies = useSelector(state => state.movieData.bannerData || []);
    const watchedMovies = allMovies.filter(movie => watched.includes(movie.id));

    return (
        <Container className="py-4">
            <h2 className="mb-4">🎬 Watched Movies</h2>
            <Row>
                {watchedMovies.length > 0 ? (
                    watchedMovies.map(movie => (
                        <Col key={movie.id} md={4} className="mb-4">
                            <MoviesCard movie={movie} page="watched" />
                        </Col>
                    ))
                ) : (
                    <p>No movies have been watched yet.</p>
                )}
            </Row>
        </Container>
    );
};

export default Watched;