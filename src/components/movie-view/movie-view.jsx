import React, {useEffect,useState} from "react";
import Button from "react-bootstrap/Button";
import { Card } from "react-bootstrap";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import "./movie-view.scss";

export const MovieView = ({ movie }) => {
  const { movieId } = useParams();
  const [ isFavorite, setIsFavorite ] = useState(false);

  useEffect(() => {
    const isFavorited = user.FavoriteMovies.includes(movieId)
    setIsFavorite(isFavorited)
 }, []);


 const removeFavorite = () => {
  fetch(`https://myflixmovieapp-3df5d197457c.herokuapp.com/users/${user.Username}/${movieId}`, {
      method: "DELETE",
      headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
      }
  }).then((response) => {
      if (response.ok) {
          return response.json()
      }
  }).then((data) => {
      setIsFavorite(false);
      localStorage.setItem("user", JSON.stringify(data));
      setUser(data);
  })
};

const addToFavorite = () => {
  fetch(`https://myflixmovieapp-3df5d197457c.herokuapp.com/users/${user.Username}/${movieId}`, {
      method: "PUT",
      headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
      }
  }).then((response) => {
      if (response.ok) {
          return response.json()
      }
  }).then((data) => {
      setIsFavorite(true);
      localStorage.setItem("user", JSON.stringify(data));
      setUser(data);
  })
}



  const movie = movies.find((b) => b.id === movieId);

  return (
    <Card className="mt-1 mb-1 h-100 bg-secondary" >
            <Card.Img variant="top" src={movie.Image}/>
            <Card.Body>
                <Card.Title>{movie.Title}</Card.Title>
                <Card.Text>Description: {movie.Description}</Card.Text>
                <Card.Text>Director: {movie.Director.Name}</Card.Text>
                <Card.Text>Genre: {movie.Genre.Name}</Card.Text>
            </Card.Body>

            {isFavorite ? (
                <Button onClick={removeFavorite}>Remove from favorites</Button>
            ) : (
                <Button onClick={addToFavorite}>Add to favorites</Button>
            )}

            <Link to={"/"}>
            <Button>Back</Button>
            </Link>
        </Card>
  );
};