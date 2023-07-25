import React from "react";
import "./movie-view.scss";

export const MovieView = ({ movie }) => {
  const { movieId } = useParams();

  const book = movies.find((b) => b.id === movieId);

  return (
    <div>
      <div>
        <img className="w-100" src={movie.Image} />
      </div>
      <div>
        <span>Title: </span>
        <span>{movie.Title}</span>
      </div>
      <div>
        <span>Director: </span>
        <span>{movie.Director.Name}</span>
      </div>
      <div>
        <span>Genre: </span>
        <span>{movie.Genre.Name}</span>
      </div>
      <div>
        <span>Description: </span>
        <span>{movie.Description}</span>
      </div>
      <Link to={`/`}>
        <button className="back-button">Back</button>
      </Link>
    </div>
  );
};