import { Navbar, Nav, Container } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Header = () => {
  const favorites = useSelector((state) => state.movieData.favorites);

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand><Link to="/">🎬 MovieApp</Link></Navbar.Brand>
        <Nav className="ms-auto d-flex align-items-center gap-3">
        <Link to="/series" className="btn btn-outline-light">Series</Link>
        <Link to="/favorites" className="btn btn-outline-light">Favorites</Link>
        <Link to="/watching" className="btn btn-outline-light">Watching</Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Header;
