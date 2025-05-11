import { useSelector } from 'react-redux';
import { Container, Row, Col } from 'react-bootstrap';
import { MoviesCard } from '../components/moviesCard';
import { SeriesCard } from '../components/SeriesCard';

const Favorites = () => {
    const favorites = useSelector(state => state.movieData.favorites || []);
    const allMovies = useSelector(state => state.movieData.bannerData || []);
    const favoriteMovies = allMovies.filter(movie => favorites.includes(movie.id));

    const allSeries = useSelector((state) => state.seriesData.bannerData || []);
    const seriesFavorites = useSelector((state) => state.seriesData.favorites || []);
    const favoriteSeries = allSeries.filter((series) => seriesFavorites.includes(series.id));


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
            <Row>
                {favoriteSeries.length > 0 ? (
                    favoriteSeries.map((series) => (
                        <Col key={series.id} md={4} className="mb-4">
                            <SeriesCard show={series} page="favorites" />
                        </Col>
                    ))
                ) : (
                    <p>No favorite series added yet.</p>
                )}
            </Row>
        </Container>
    );
};
export default Favorites;
