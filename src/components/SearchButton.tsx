import React from "react";

interface MyButtonProps {
  onClick: () => void;
}

const MyButton: React.FC<MyButtonProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      tabIndex={0} // Ensure the button is focusable for keyboard interactions
    >
      Click Me
    </button>
  );
};

export default MyButton;
