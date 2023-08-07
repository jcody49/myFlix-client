import React, { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { ProfileView } from "../profile-view/profile-view";
import moviesImage from "../../assets/movies.png";


import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { NavigationBar } from "../navigation-bar/navigation-bar";

export const MainView = () => {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(storedUser || null);
  const [token, setToken] = useState(storedToken || null);
  const [filter, setFilter] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);


  console.log("Token from localStorage:", token);

  const handleLogout = () => {
    console.log("test");
    setUser(null);
    setToken(null);
    localStorage.clear(); // Clearing token and other user data from localStorage
  };

  useEffect(() => {
    if (!token) {
      setLoading(false); // If there's no token, set loading to false
      return;
    }
    fetch("https://myflixmovieapp-3df5d197457c.herokuapp.com/movies", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((data) => {
        const moviesFromApi = data.map((movie) => {
          return {
            _id: movie._id,
            ImagePath: movie.ImagePath,
            Title: movie.Title,
            Description: movie.Description,
            Genre: {
              Name: movie.Genre.Name,
            },
            Director: {
              Name: movie.Director.Name,
            },
            Featured: movie.Featured,
          };
        });
        setMovies(moviesFromApi);
        setLoading(false); // Set loading to false after fetching the movies
      })
      .catch((error) => {
        console.log("error", error);
        setLoading(false); // Set loading to false after fetching the movies
      });
  }, []);


  return (
    <BrowserRouter>
      <NavigationBar user={user} onLoggedOut={handleLogout} />
      <Row className="justify-content-md-center">
        <Routes>
          <Route
            path="/signup"
            element={
              <>
                {user ? (
                  <Navigate to="/profile" />
                ) : (
                  <Col md={5}>
                    <SignupView />
                  </Col>
                )}
              </>
            }
          />
          <Route
            path="/login"
            element={
              <>
                {user ? (
                  <Navigate to="/" />
                ) : (
                  <Col md={5}>
                    <LoginView onLoggedIn={(user) => setUser(user)} />
                  </Col>
                )}
              </>
            }
          />
          <Route
            path="/profile"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" />
                ) : (
                  <Col md={5}>
                    <ProfileView movies={movies} />
                  </Col>
                )}
              </>
            }
          />
          <Route
            path="/movies/:movieId"
            element={
              <>
                {isLoggedIn ? (
                  <ProfileView movies={movies} />
                ) : (
                  <>
                    <Row className="justify-content-center">
                      <img
                        src={moviesImage}
                        alt="Movies"
                        className="movies-image"
                        style={{ width: "80%", maxWidth: "400px" }}
                      />
                    </Row>
                    {/* Rest of the code for the MoviesView */}
                  </>
                )}
              </>
            }
          />
          <Route
            path="/"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : (
                  <>
                    <Row className="justify-content-center">
                      <img 
                      src={moviesImage} 
                      alt="Movies" 
                      className="movies-image" 
                      style={{ width: "80%", maxWidth: "400px"}}
                      />
                    </Row>
                    <Row className="mt-1 mb-2 ms-1 w-100">
                        <Form.Control
                        className="text-white"
                        type="text"
                        placeholder="Search..."
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                        />
                    </Row>
                    {loading ? (
                      <Col>Loading movies...</Col>
                    ) : movies.length === 0 ? (
                      <Col>This list is empty!</Col>
                    ) : (
                      movies
                        .filter((movie) =>
                          movie.Title
                            .toLowerCase()
                            .includes(filter.toLowerCase())
                        )
                        .map((movie) => (
                          <Col className="mb-5" key={movie._id} md={4}>
                            <MovieCard movie={movie} />
                          </Col>
                        ))
                    )}
                  </>
                )}
              </>
            }
          />
          <Route
            path="/movies"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                  <Col>The list is empty!</Col>
                ) : (
                  <>
                    {movies.map((movie) => (
                      <Col className="mb-4" key={movie._id} md={3}>
                        <MovieCard movie={movie} />
                      </Col>
                    ))}
                  </>
                )}
              </>
            }
          />
        </Routes>
      </Row>
    </BrowserRouter>
  );
};
