import React from "react";

interface WindCompassProps {
  windDirection: number;
}

const WindCompass: React.FC<WindCompassProps> = ({ windDirection }) => {
  const handleLength = 40;
  const pointWidth = 8;

  const pointX =
    Math.cos((windDirection - 90) * (Math.PI / 180)) * handleLength;
  const pointY =
    Math.sin((windDirection - 90) * (Math.PI / 180)) * handleLength;

  return (
    <svg
      className="wind-compass"
      width="80"
      height="80"
      viewBox="-45 -45 90 90"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Compass circle - change the size in here*/}
      <circle
        cx="0"
        cy="0"
        r="40" // Radius of the compass circle
        fill="transparent"
        stroke="#fff"
        strokeWidth="2"
      />

      {/* Handle with point */}
      <line
        x1="0"
        y1="0"
        x2={pointX} // End point x-coordinate
        y2={pointY} // End point y-coordinate
        stroke="#fff"
        strokeWidth="2"
      />
      <circle cx={pointX} cy={pointY} r={pointWidth / 2} fill="#fff" />
    </svg>
  );
};

export default WindCompass;
