import { useSelector } from 'react-redux';
import { Container, Row, Col } from 'react-bootstrap';
import { MoviesCard } from '../components/moviesCard';

const Favorites = () => {
    const favorites = useSelector(state => state.movieData.favorites || []);
    const allMovies = useSelector(state => state.movieData.bannerData || []);
    const favoriteMovies = allMovies.filter(movie => favorites.includes(movie.id));

    return (
        <Container className="py-4">
            <h2 className="mb-4">Favorite Movies</h2>
            <Row>
                {favoriteMovies.length > 0 ? (
                    favoriteMovies.map(movie => (
                        <Col key={movie.id} md={4} className="mb-4">
                            <MoviesCard movie={movie} page="favorites" />
                        </Col>
                    ))
                ) : (
                    <p>No favorite movies added yet.</p>
                )}
            </Row>
        </Container>
    );
};
export default Favorites;
