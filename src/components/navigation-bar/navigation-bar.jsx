import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./navigation-bar.scss";
import logo from "../../assets/myFlix-logo.png"; // Import the logo image

export const NavigationBar = ({ user, onLoggedOut }) => {
  return (
    <Navbar className="custom-navbar" expand="lg">
      <Container>
        <Navbar.Brand as={Link}  to="/">
        <img src={logo} alt="My App Logo" className="navbar-logo" />
        <br />
          Navigation
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/movies">Movies</Nav.Link>
            <Nav.Link as={Link} to="/profile">Profile</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
      <Nav>
        <Nav.Link onClick={onLoggedOut}>Log Out</Nav.Link>
      </Nav>
    </Navbar>
  );
};
