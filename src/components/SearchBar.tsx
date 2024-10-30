import React, { useState, useRef, useEffect } from "react";
import { MotionValue } from "framer-motion";
import axios from "axios";
import ArrowButton from "./ArrowButton";
import { AxiosError } from "axios";

interface ExpandableSearchBarProps {
  color: MotionValue<string>;
  setMovies: (movies: any) => void;
}

const ExpandableSearchBar: React.FC<ExpandableSearchBarProps> = ({
  color,
  setMovies,
}) => {
  const [query, setQuery] = useState("");
  const [error, setError] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newQuery = event.target.value;
    setQuery(newQuery);
    adjustTextareaHeight();
  };

  const adjustTextareaHeight = () => {
    if (textareaRef.current) {
      const padding = 22; // Total vertical padding (14px top + 8px bottom)
      const minHeight = 56; // Minimum height of the textarea (single line + padding)
      const maxHeight = 200; // Maximum height of the textarea

      // Reset height to auto to get the correct scrollHeight
      textareaRef.current.style.height = "auto";

      // Calculate new height based on content
      const newHeight = Math.min(
        Math.max(textareaRef.current.scrollHeight, minHeight),
        maxHeight
      );

      // Set the new height
      textareaRef.current.style.height = `${newHeight}px`;

      // Enable or disable scrolling based on content height
    }
  };

  useEffect(() => {
    // Initial height adjustment
    adjustTextareaHeight();

    const unsubscribe = color.onChange(() => {
      if (textareaRef.current) {
        textareaRef.current.style.border = `1px solid ${color.get()}`;
        textareaRef.current.style.boxShadow = `0px 4px 24px ${color.get()}`;
      }
    });

    return () => {
      unsubscribe();
    };
  }, [color]);

  const handleSubmit = async () => {
    console.log("Search query:", query);
    setError("");
    try {
      const response = await axios.post(
        "https://439q80f62e.execute-api.us-east-1.amazonaws.com/production/recommendations", // Changed URL
        { description: query },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          withCredentials: false, // Good that this is already false
        }
      );
      console.log(response.data);
      setMovies(response.data.movies);
    } catch (error: unknown) {
      // Your existing error handling is good
      console.error("Error details:", error);
      if (error instanceof AxiosError) {
        if (error.response) {
          console.error("Server responded with:", error.response.data);
          console.error("Status code:", error.response.status);
        } else if (error.request) {
          console.error("No response received:", error.request);
        } else {
          console.error("Error setting up request:", error.message);
        }
      }
      setError(
        "Failed to fetch movie recommendations. Please try again later."
      );
    } finally {
      setQuery("");
      if (textareaRef.current) {
        textareaRef.current.style.height = "56px";
        textareaRef.current.style.overflowY = "hidden";
      }
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div
      className="search-bar-container"
      style={{
        marginTop: "20%",
        display: "flex",
        position: "relative",
        justifyContent: "center",
      }}
    >
      <div
        className="search-bar-wrapper"
        style={{ position: "absolute", bottom: "95%", maxWidth: "800px" }}
      >
        <textarea
          ref={textareaRef}
          value={query}
          onChange={handleInputChange}
          onKeyDown={handleKeyPress}
          className="search-bar"
          style={{
            maxWidth: "95%",
            width: "600px",
            minHeight: "56px",
            maxHeight: "300px",
            paddingRight: "50px",
            paddingLeft: "25px",
            paddingTop: "14px",
            paddingBottom: "8px",
            border: "1px solid #ccc",
            borderRadius: "50px",
            backgroundColor: "#333",
            color: "#c9c9c9",
            fontSize: "22px",
            lineHeight: "30px",
            boxSizing: "border-box",
            outline: "none",
            resize: "none",
            overflowY: "hidden",
            transition: "height 0.1s ease-out",
          }}
          placeholder="Describe the movie you would like to watch..."
        />
        <ArrowButton onClick={handleSubmit} />
      </div>
      {error && <div style={{ color: "red", marginTop: "10px" }}>{error}</div>}
    </div>
  );
};

export default ExpandableSearchBar;
