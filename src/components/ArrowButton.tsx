import React from "react";
import ArrowIcon from "../images/arrow-icon.png";
import "../ArrowButton.css";

interface ArrowButtonProps {
  onClick: () => void;
}

const ArrowButton: React.FC<ArrowButtonProps> = ({ onClick }) => {
  return (
    <button onClick={onClick} className="arrow-button">
      <img src={ArrowIcon} alt="Submit" />
    </button>
  );
};

export default ArrowButton;
