import React, { useState } from 'react';
import axios from 'axios';

const MovieSearch = () => {
    const [userInput, setUserInput] = useState('');
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState(null);

    const handleInputChange = (e) => {
        setUserInput(e.target.value);
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const response = await axios({
                method: 'post',
                url: 'https://439q80f62e.execute-api.us-east-1.amazonaws.com/production/recommendations',
                data: { description: userInput },
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            });
    
            console.log('Response:', response.data);
            setMovies(response.data.movies || []);
            setError(null);
        } catch (err) {
            console.error('Error details:', err);
            setError(err.message);
            setMovies([]);
        }
    };
    
    

    return (
        <div>
            <form onSubmit={handleFormSubmit}>
                <input type="text" value={userInput} onChange={handleInputChange} />
                <button type="submit">Search Movies</button>
            </form>
            {error && <p>Error: {error}</p>}
            {movies && movies.map((movie) => (
                <div key={movie.id}>
                    <p>Overview: {movie.overview}</p>
                    <p>Rating: {movie.rating}</p>
                    {movie.poster_path && <img src={movie.poster_path} alt="Movie Poster" />}
                </div>
            ))}
        </div>
    );
};

export default MovieSearch;