import { Navbar, Nav, Container, Dropdown } from "react-bootstrap";
import { FaVideo, FaHeart, FaPlay } from "react-icons/fa";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import React from "react";
import { LanguageContext } from "../LanguageContext";
import { appItems } from "../services/config";

export const Header = () => {
  const { language, setLanguage } = useContext(LanguageContext);
  const [items, setItems] = useState(
    appItems[language.substring(0, 2).toLowerCase()],
  );
  const [isRTL, setIsRTL] = useState(document.documentElement.dir === "rtl");

  const handleLanguageChange = (value) => {
    console.log(value);
    setLanguage(value);
  };

  useEffect(() => {
    setItems(appItems[language.substring(0, 2).toLowerCase()]);
    document.documentElement.dir = language.startsWith("ar") ? "rtl" : "ltr";
    setIsRTL(document.documentElement.dir === "rtl");
  }, [language]);

  return (
    <Navbar variant="light" expand="lg" style={{ background: "#FFE353" }}>
      <Container>
        <Navbar.Brand>
          <Link to="/" className="text-dark fw-bold text-decoration-none">
            {items.projectTitle}
          </Link>
        </Navbar.Brand>

        <Nav
          className={`${
            isRTL ? "me-auto" : "ms-auto"
          } d-flex align-items-center gap-3`}
        >
          {/* Watch List */}
          <Link
            to="/favorites"
            className={`btn d-flex align-items-center fw-semibold ${
              isRTL ? "ms-2" : "me-2"
            }`}
          >
            <FaHeart className={`${isRTL ? "ms-2" : "me-2"}`} />
            {items.favorites}
          </Link>

          {/* Watching Button */}
          <Link
            to="/watching"
            className={`btn d-flex align-items-center fw-semibold ${
              isRTL ? "ms-2" : "me-2"
            }`}
          >
            <FaPlay className={`${isRTL ? "ms-2" : "me-2"}`} />
            {items.watchList}
          </Link>
          <Link
            to="/series"
            className={`btn d-flex align-items-center fw-semibold ${
              isRTL ? "ms-2" : "me-2"
            }`}
          >
            <FaVideo className={`${isRTL ? "ms-2" : "me-2"}`} />
            {items.series}
          </Link>
        </Nav>

        {/* Language Dropdown */}
        <Dropdown onSelect={(eventKey) => handleLanguageChange(eventKey)}>
          <Dropdown.Toggle
            className="fw-semibold"
            variant="outline"
            id="dropdown-lang"
          >
            {language.substring(0, 2).toUpperCase()}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item className="fw-semibold" id="en" eventKey="en-US">
              English
            </Dropdown.Item>
            <Dropdown.Item className="fw-semibold" id="ar" eventKey="ar-EG">
              العربية
            </Dropdown.Item>
            <Dropdown.Item className="fw-semibold" id="fr" eventKey="fr-FR">
              Français
            </Dropdown.Item>
            <Dropdown.Item className="fw-semibold" id="zh" eventKey="zh-CN">
              中文
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Container>
    </Navbar>
  );
};
