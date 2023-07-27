import React from "react";
import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

export const MovieCard = ({ movie }) => {
  return (
      <Card className="h-100 bg-secondary">
          <Card.Img variant="top" src={movie.Image} />
          <Card.Body>
              <Card.Title>{movie.Title}</Card.Title>
              <Card.Text>Director: {movie.Director.Name}</Card.Text>
              <Card.Text>Description: {movie.Description}</Card.Text>
              <Link to={`/movies/${encodeURIComponent(movie._id)}`}>
                  <Button variant="link">
                      Open
                  </Button>
              </Link>
          </Card.Body>
      </Card>
  );
};

// defines all the props constraints for the MovieCard
MovieCard.propTypes = {
  movie: PropTypes.shape({
    ImagePath: PropTypes.string.isRequired,
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired
    }).isRequired,
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired
    }).isRequired,
    Featured: PropTypes.bool.isRequired
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired
};

