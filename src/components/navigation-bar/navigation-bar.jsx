import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./navigation-bar.scss";
import logo from "../../assets/myFlix-logo.png"; // Import the logo image
import { DeleteAccountConfirmation } from "../delete-account-confirmation/delete-account-confirmation";

export const NavigationBar = ({ user, token, onLoggedOut }) => {
console.log("token:", token)
  return (
    <Navbar className="custom-navbar mb-3" expand="lg">
    <Container>
      <div className="navbar-brand-container">
        <Link to="/profile">
          <img src={logo} alt="My App Logo" className="navbar-logo" />
        </Link>
      </div>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />

      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="d-flex justify-content-center">
          {user ? (
            <>
              <Nav.Link as={Link} to="/movies">
                Movies
              </Nav.Link>
              <Nav.Link as={Link} to="/profile">
                Profile
              </Nav.Link>
              <Nav>
                <Nav.Link onClick={onLoggedOut}>
                  Log Out
                </Nav.Link>
                
                  <DeleteAccountConfirmation
                    user={user}
                    token={token}
                    onLoggedOut={onLoggedOut}
                  />
              </Nav>
              
            </>
          ) : (
            <>
              <Nav.Link as={Link} to="/login">
                Login
              </Nav.Link>
              <Nav.Link as={Link} to="/signup">
                Signup
              </Nav.Link>
            </>
          )}
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>

  );
};
