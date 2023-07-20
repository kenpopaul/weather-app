import React from "react";
import "./WindCompass.css";

interface WindCompassProps {
  windDirection: number; // Wind direction in degrees (0 to 360)
}

const WindCompass: React.FC<WindCompassProps> = ({ windDirection }) => {
  // Calculate the end coordinates of the line based on wind direction
  const x2 = 50 + Math.sin((windDirection * Math.PI) / 180) * 30;
  const y2 = 50 - Math.cos((windDirection * Math.PI) / 180) * 30;

  return (
    <div className="wind-compass">
      <svg
        className="compass-icon"
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Compass shape */}
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke="black"
          strokeWidth="3"
        />
        <path d="M50,5 L55,15 L45,15 L50,5" fill="black" />
        <path d="M95,50 L85,55 L85,45 L95,50" fill="black" />
        <path d="M50,95 L55,85 L45,85 L50,95" fill="black" />
        <path d="M5,50 L15,55 L15,45 L5,50" fill="black" />

        {/* Hand of the compass */}
        <line x1="50" y1="50" x2={x2} y2={y2} stroke="black" strokeWidth="2" />
      </svg>
    </div>
  );
};

export default WindCompass;
