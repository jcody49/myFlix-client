import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

const MainView = () => {
  const [movies, setMovies] = useState([
    {
      id: "647f90f816db8bdac05eb155",
      Title: "A Quiet Place",
      Image: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIACQAJAMBIgACEQEDEQH/xAAaAAACAwEBAAAAAAAAAAAAAAAABQQGBwMB/8QAMRAAAQMDAgUCBAUFAAAAAAAAAQIDBAAFERIhBhMxUXFBgSJSYZEyobHB4QcUFSRC/8QAGAEAAwEBAAAAAAAAAAAAAAAAAAMEAQL/xAAgEQACAgIBBQEAAAAAAAAAAAAAAQIRAyExBCNBUWEF/9oADAMBAAIRAxEAPwDLpMJqOsct4nvv0qUyuApBL7zyVAZ/GCD+9TovBlxuNtF2Ymw1RSSFrU7goI7pxntsAetQplheiKUJDEoMhOUvlr4Fn0wRt7ZzSdex6yuPCHljVbItruKp6W35Ba/1EraJKVbg9QUj03P81a7LBg3GxOvRLdHXNQhptLulCU80Nt6xjHUqKvORgjqMocuLrZ0KCuYM6VAAggnP2rUOH2HbNYJN2j3F9xhDDchbH9olThK2217Yz0ynfukk4G9YoPyVZepxV2m7+nC6OW5ie80hkttpxy0cxOyCAUnf1KSCfNFJOI+JxHvs2PpbkFhzkqcDIQCpACTgdgU4HiilvG7BfoNKi22Xk2hEFp5l2a6pznutkndIDmhJxn/pIJ9O9MP6g8Tpk25uK7aJyFPxw4pekKQ3kkBJPzZA267jalfCUiU5Ojz18xlCUFt9RHQfEQCfcfc1B4u4og2OO5Dtst+RJczzyF41EknUtY+qjhKQD0ycDFCt6JVVWUZM5GkoUwtCwspwRggjfGPQ9fenPDnG6LNFkMyLe68lTpdSWtIz+HCSex0kH6KOx9U/DMVmbLYS/j4Qt9TY2yT0xjzVmftlutsV0PwXlyMFxOFaU6fbqPampKL0GbqsuZKM3pFQvt4jXG7Pyo8RSWlhtKQ6k6sIbSjJwcb6c+9e1bHl2kJaUIbqgtsEFo5T+fiiurJrQxenSLe44zEXy0BXQeCT+mPFZVcHlSJrjqwkFxWopSMAZ7D0oorYgjpa3F/5COQsg68A9hVu4kv9xn8h2S+VLbZU0kj5Rt9/r9KKKJcmS5Ek+7TWnkp55UNCT8Q6ZGfTzRRRQkB//9k=",
      Director: "John Krasinski",
      Genre: "Horror",
      Description: "In a post-apocalyptic world, a family must live in silence to avoid deadly creatures that hunt by sound."
    },
    {
        id: "647f90f816db8bdac05eb154",
        Title: "Little Miss Sunshine",
        Image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwyKx8g51ZQ_YZXCYjuVSoCL0ZiZHKkX4zSuHzwcMAxjdwdEQM",
        Director: "Jonathan Dayton and Valerie Faris",
        Genre: "Comedy",
        Description: "A dysfunctional family takes a cross-country trip in their old VW bus to support their young daughter's dream of participating in a beauty pageant."
    },
    {
        id: "647f90f816db8bdac05eb153",
        Title: "Idiocracy",
        Image: "data:image/jpeg;base64,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",
        Director: "Mike Judge",
        Genre: "Sci-Fi",
        Description: "In a future where intelligence has declined, an average Joe is chosen to be part of a top-secret experiment to hibernate for 500 years. He wakes up in a dystopian society filled with incredibly dumbed-down people."
    }
  ]);

  const [selectedMovie, setSelectedMovie] = useState(null);

  if (selectedMovie) {
    return (
      <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
    );
  }

  if (movies.length === 0) {
    return <div>The list is empty!</div>;
  }

  return (
    <div>
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onMovieClick={(newSelectedMovie) => {
            setSelectedMovie(newSelectedMovie);
          }}
        />
      ))}
    </div>
  );
};
export default MainView;