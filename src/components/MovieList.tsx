import React, { useState } from "react";
import { MotionValue } from "framer-motion";
import "../movieContainer.css";
import { Movie } from "../types";

interface MovieListProps {
  movies: Movie[];
  color: MotionValue<string>; // Receive color as a prop
}

const MovieList: React.FC<MovieListProps> = ({ movies, color }) => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const handleCardClick = (index: number) => {
    setExpandedIndex(index);
  };

  const handleClosePopup = () => {
    setExpandedIndex(null);
  };

  return (
    <div>
      <div className="movie-container">
        {movies.length === 0 ? (
          <p></p>
        ) : (
          movies.map((movie, index) => (
            <div
              key={index}
              className="movie-box"
              onClick={() => handleCardClick(index)}
              style={{
                borderColor: color.get(), // Apply the animated color to the border
                boxShadow: `0px 4px 12px ${color.get()}`, // Apply the animated color to the shadow
              }}
            >
              <div className="movie-title">
                {movie.name} ({movie.release_year})
              </div>
              {movie.poster_path && (
                <img
                  src={movie.poster_path}
                  alt={movie.name}
                  className="movie-poster"
                />
              )}
            </div>
          ))
        )}
      </div>

      {expandedIndex !== null && (
        <div className="popup-background" onClick={handleClosePopup}>
          <div
            className="popup-content"
            onClick={(e) => e.stopPropagation()}
            style={{
              borderColor: color.get(),
              borderStyle: "solid",
              boxShadow: `0px 4px 12px ${color.get()}`,
            }}
          >
            <button className="close-button" onClick={handleClosePopup}>
              X
            </button>
            <img
              src={movies[expandedIndex].poster_path || ""}
              alt={movies[expandedIndex].name}
              className="popup-poster"
            />
            <div className="popup-details">
              <div className="popup-title">{movies[expandedIndex].name}</div>
              <div className="popup-rating">
                Rating: {movies[expandedIndex].rating || "N/A"}
              </div>
              <div className="popup-overview">
                {movies[expandedIndex].overview}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieList;
