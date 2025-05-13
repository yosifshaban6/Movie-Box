import { Navbar, Nav, Container, Dropdown } from 'react-bootstrap';
import { FaHeart, FaPlay } from 'react-icons/fa';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import React from 'react';

const Header = () => {
  const [language, setLanguage] = useState('EN');

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
    // Add i18n logic if needed
  };

  return (
    <Navbar variant="light" expand="lg" style={{background :"#FFE353"}}>
      <Container>
        {/* Left: MovieApp Title */}
        <Navbar.Brand>
          <Link to="/" className="text-dark fw-bold text-decoration-none">
            Movie App
          </Link>
        </Navbar.Brand>

        {/* Right: Nav Options */}
        <Nav className="ms-auto d-flex align-items-center gap-3">
          {/* Language Dropdown */}
          <Dropdown>
            <Dropdown.Toggle variant="outline" id="dropdown-lang">
              {language}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => handleLanguageChange('EN')}>EN</Dropdown.Item>
              <Dropdown.Item onClick={() => handleLanguageChange('AR')}>AR</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          {/* Watch List */}
          <Link to="/favorites" className="btn d-flex align-items-center">
            <FaHeart className="me-2" />
            Watch List
          </Link>

          {/* Watching Button */}
          <Link to="/watching" className="btn d-flex align-items-center fw-semibold">
            <FaPlay className="me-2" />
            Watching
          </Link>
          <Link to="/series" className="btn d-flex align-items-center fw-semibold">
            Series
          </Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Header;
