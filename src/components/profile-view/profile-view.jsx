import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Modal from "react-bootstrap/Modal";
import { MovieCard } from "../movie-card/movie-card";
import "./profile-view.scss";
import profileImage from "../../assets/profile.png";

export const ProfileView = ({ user, token, movies, onLoggedOut }) => {
  const [Username, setUsername] = useState(user.Username);
  const [Password, setPassword] = useState("");
  const [Email, setEmail] = useState(user.Email);
  const [Birthdate, setBirthdate] = useState(user.Birthdate);
  const [showModal, setShowModal] = useState(false);

  const favoriteMovies = movies.filter((movie) => {
    return user.FavoriteMovies.includes(movie._id)
  });

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      Username: Username,
      Password: Password,
      Email: Email,
      Birthdate: Birthdate
    };

    fetch(`https://myflixmovieapp-3df5d197457c.herokuapp.com/users/${user.Username}`, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json", 
        Authorization: `Bearer ${token}`
      }
    }).then((response) => {
      if(response.ok) {
        return response.json()
      } else {
        alert("Update failed")
      }
    }).then((data) => {
      if(data !== undefined) {
        localStorage.setItem("user", JSON.stringify(data));
        setUser(data);
      }
    })
  };

  const handleDeleteUser = () => {
    fetch(`https://myflixmovieapp-3df5d197457c.herokuapp.com/users/${user.Username}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((response) => {
      if (response.ok) {
        console.log("Deletion successful");
        onLoggedOut();
      } else {
        alert("something went wrong.")
      }
    })
  }

    return (
        <>
            <Col className="d-flex justify-content-center">
                <img 
                    src={profileImage} 
                    alt="Profile" 
                    className="profile-image d-flex justify-content-center"
                    style={{ width: "80%", maxWidth: "400px"}} 
                />
                
            </Col>
            <Row 
                style={{ position: "relative", top: "-42px" }}>
                <h6 className="d-flex justify-content-center mb-3 text-primary">
                    Welcome to your myFlix profile, {user.Username}!
                </h6>
            </Row>

            <Row className="mt-1 mb-3">
                <Col className="text-white ms-n3">
                <div 
                    className="text-secondary d-flex justify-content-center">
                    <h3>Profile Details</h3>
                </div>
                <div>Username: {user.Username}</div>
                <div>Email: {user.Email}</div>
                </Col>
                <Col className="text-white">
                    <div className="text-secondary d-flex justify-content-center"><h3>Update your profile</h3></div>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formUsername">
                            <Form.Label className="profile-subheader-2">Username:</Form.Label>
                            <Form.Control
                                type="text"
                                value={Username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                                minLength="5" 
                                style={{ color: "white" }}
                            />
                        </Form.Group>
                        <Form.Group controlId="formPassword">
                            <Form.Label className="profile-subheader-2">Password:</Form.Label>
                            <Form.Control
                                type="password"
                                value={Password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                minLength="5"
                            />
                        </Form.Group>
                        <Form.Group controlId="formEmail">
                            <Form.Label className="profile-subheader-2">Email:</Form.Label>
                            <Form.Control
                                type="email"
                                value={Email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                style={{ color: "white" }}
                            />
                        </Form.Group>
                        <Form.Group controlId="formBirthday">
                            <Form.Label className="profile-subheader-2">Birth Date:</Form.Label>
                            <Form.Control
                                type="date"
                                value={Birthdate}
                                onChange={(e) => setBirthdate(e.target.value)}
                                required
                                style={{ color: "white" }}
                            />
                        </Form.Group>
                        <Button className="mt-2 d-flex justify-content-center mx-auto"variant="primary" type="submit">Save changes</Button>
                    </Form>
                </Col>
            </Row>
            <Row>
                <h3 className="text-secondary d-flex justify-content-center mt-5 mb-3">Favorite movies:</h3>
                {favoriteMovies.length === 0 ? (
                    <Col className="mb-5 d-flex justify-content-center">
                    <p className="text-white">Favorite movie list is currently empty.</p>
                    </Col>
                ) : (
                    favoriteMovies.map((movie) => (
                    <Col className="mb-5" key={movie._id} md={4}>
                        <MovieCard movie={movie}></MovieCard>
                    </Col>
                    ))
                )}
            </Row>
           
        </>
    )
}
