import React from "react";

interface WindCompassProps {
  windDirection: number;
}

const WindCompass: React.FC<WindCompassProps> = ({ windDirection }) => {
  const handleLength = 40;
  const handleX =
    Math.cos((windDirection - 90) * (Math.PI / 180)) * handleLength;
  const handleY =
    Math.sin((windDirection - 90) * (Math.PI / 180)) * handleLength;

  const textOffset = 30;

  return (
    <svg
      className="wind-compass"
      width="100" // Width of compass
      height="100" // Height of compass
      viewBox="-50 -50 100 100" // Viewbox for a larger compass
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Outer circle */}
      <circle cx="0" cy="0" r="44" fill="grey" strokeWidth="6" stroke="grey" />

      {/* Compass circle */}
      <circle cx="0" cy="0" r="40" fill="black" stroke="#fff" strokeWidth="2" />

      {/* Handle with small red circle at the end */}
      <line
        x1="0"
        y1="0"
        x2={handleX}
        y2={handleY}
        stroke="#fff"
        strokeWidth="2"
      />
      <circle cx={handleX} cy={handleY} r="4" fill="red" />

      {/* Add cardinal directions */}
      <text x="0" y={-textOffset} textAnchor="middle" fill="#fff" fontSize="10">
        N
      </text>
      <text x="0" y={textOffset} textAnchor="middle" fill="#fff" fontSize="10">
        S
      </text>
      <text x={textOffset} y="4" textAnchor="middle" fill="#fff" fontSize="10">
        E
      </text>
      <text x={-textOffset} y="4" textAnchor="middle" fill="#fff" fontSize="10">
        W
      </text>
    </svg>
  );
};

export default WindCompass;
