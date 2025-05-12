import { useSelector } from 'react-redux';
import { Container, Row, Col } from 'react-bootstrap';
import { MoviesCard } from '../components/moviesCard';
import { SeriesCard } from '../components/SeriesCard';
import React from 'react';


const Watching = () => {
    const watching = useSelector(state => state.movieData.watching || []);
    const allMovies = useSelector(state => state.movieData.bannerData || []);
    const watchingMovies = allMovies.filter(movie => watching.includes(movie.id));

    const allSeries = useSelector((state) => state.seriesData.bannerData || []);
    const serieswatching = useSelector((state) => state.seriesData.watching || []);
    const watchingSeries = allSeries.filter((series) => serieswatching.includes(series.id));

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
            <Row>
                {watchingSeries.length > 0 ? (
                    watchingSeries.map((series) => (
                        <Col key={series.id} md={4} className="mb-4">
                            <SeriesCard show={series} page="watching" />
                        </Col>
                    ))
                ) : (
                    <p>No watching series added yet.</p>
                )}
            </Row>
        </Container>
    );
};

export default Watching;
