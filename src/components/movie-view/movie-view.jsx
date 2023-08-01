import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import { Card } from "react-bootstrap";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import "./movie-view.scss";

export const MovieView = ({ movies, user, setUser }) => {
  const { movieId } = useParams();
  const [isFavorite, setIsFavorite] = useState(false);
  //const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
  
  const token = localStorage.getItem('token');

  useEffect(() => {
    const isFavorited = user.FavoriteMovies.includes(movieId);
    setIsFavorite(isFavorited);
  }, [user]);

  const removeFavorite = () => {
    fetch(
      `https://myflixmovieapp-3df5d197457c.herokuapp.com/users/${user.Username}/movies/${movieId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
      })
      .then((data) => {
        setIsFavorite(false);
        localStorage.setItem("user", JSON.stringify(data));
        setUser(data);
      });
  };

  const addToFavorite = () => {
    fetch(
      `https://myflixmovieapp-3df5d197457c.herokuapp.com/users/${user.Username}/movies/${movieId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
      })
      .then((data) => {
        setIsFavorite(true);
        localStorage.setItem("user", JSON.stringify(data));
        setUser(data);
      });
  };

  const movie = movies.find((b) => b._id === movieId);

  return (
    <Card className="mt-1 mb-1 h-100 bg-secondary">
      <Card.Img variant="top" src={movie.ImagePath} />
      <Card.Body>
        <Card.Title>{movie.Title}</Card.Title>
        <Card.Text>Description: {movie.Description}</Card.Text>
        <Card.Text>Director: {movie.Director.Name}</Card.Text>
        <Card.Text>Genre: {movie.Genre.Name}</Card.Text>
      {isFavorite ? (
        <Button size="sm" onClick={removeFavorite}>Remove from favorites</Button>
      ) : (
        <Button size="sm" onClick={addToFavorite}>Add to favorites</Button>
      )}
      <br/>
      <br/>
      <Link to={"/"}>
        <Button>Back</Button>
      </Link>
      </Card.Body>
    </Card>
  )
};
