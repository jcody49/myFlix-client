import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./navigation-bar.scss";
import logo from "../../assets/myFlix-logo.png"; // Import the logo image

export const NavigationBar = ({ user, onLoggedOut }) => {
  return (
    <Navbar className="custom-navbar mb-3" expand="lg">
      <Container>
        <div className="navbar-brand-container">
          <Link to="/profile">
            <img src={logo} alt="My App Logo" className="navbar-logo" />
          </Link>
          <Navbar.Brand as={Link} to="/"></Navbar.Brand>
          {user ? (
          <Container className="logout-link">
            <Nav>
              <Nav.Link onClick={onLoggedOut}>Log Out</Nav.Link>
            </Nav>
            </Container>
          ) : (
            <div className="d-flex login-signup-links"> 
            <Nav.Link as={Link} to="/login">
              Login
            </Nav.Link>
            <Nav.Link as={Link} to="/signup">
              Signup
            </Nav.Link>
          </div>
        )}
        </div>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/movies">
              Movies
            </Nav.Link>
            <Nav.Link as={Link} to="/profile">
              Profile
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
        
        
      </Container>
    </Navbar>
  );
};
