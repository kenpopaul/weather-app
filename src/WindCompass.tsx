import React from "react";
import "./WindCompass.css";

interface WindCompassProps {
  windDirection: number; // Wind direction in degrees (0 to 360)
}

const WindCompass: React.FC<WindCompassProps> = ({ windDirection }) => {
  const compassStyles: React.CSSProperties = {
    transform: `rotate(${windDirection}deg)`,
  };

  return (
    <div className="wind-compass">
      <svg
        className="compass-icon"
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
        style={compassStyles}
      >
        {/* Add the SVG paths for the compass icon */}
        {/* North */}
        <path d="M50,5 L55,15 L45,15 L50,5" fill="black" />
        {/* East */}
        <path d="M95,50 L85,55 L85,45 L95,50" fill="black" />
        {/* South */}
        <path d="M50,95 L55,85 L45,85 L50,95" fill="black" />
        {/* West */}
        <path d="M5,50 L15,55 L15,45 L5,50" fill="black" />
      </svg>
    </div>
  );
};

export default WindCompass;
