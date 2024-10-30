import React, { useState, useEffect } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  animate,
} from "framer-motion";
import ExpandableSearchBar from "./SearchBar";
import MovieList from "./MovieList";
import { Movie } from "../types";

const COLORS = ["#B47DF8", "#1E67C6", "#CE84CF", "#DD335C", "#7CB0F0"];

export const AuroraHero: React.FC = () => {
  const color = useMotionValue(COLORS[0]);
  const backgroundImage = useMotionTemplate`radial-gradient(125% 125% at 50% 0%, #020617 50%, ${color})`;

  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    animate(color, COLORS, {
      ease: "easeInOut",
      duration: 25,
      repeat: Infinity,
      repeatType: "mirror",
    });
  }, [color]);

  return (
    <motion.section
      style={{ backgroundImage, minHeight: "100vh" }}
      className="relative grid min-h-screen place-content-center
        overflow-hidden bg-gray-950 px-4 py-24 text-gray-200"
    >
      <div className="hero-content">
        {/* Pass setMovies as a prop to ExpandableSearchBar */}
        <ExpandableSearchBar color={color} setMovies={setMovies} />
      </div>
      <MovieList color={color} movies={movies} />
    </motion.section>
  );
};
