import react from "React";
import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";

export const MovieCard = ({ book, onMovieClick }) => {
  return (
    <Card onClick={() => onMovieClick(movie)}>
      <Card.Img variant="top" src={movie.image} />
      <Card.Body>
        <Card.Title>{movie.Title}</Card.Title>
        <Card.Text>{movie.Director.Name}</Card.Text>
      </Card.Body>
    </Card>
  );
};

// Here is where we define all the props constraints for the MovieCard
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

