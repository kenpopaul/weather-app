import React from "react";
import "./WindCompass.css";

interface WindCompassProps {
  windDirection: number;
}

const COMPASS_RADIUS = 60;
const HANDLE_LENGTH = 50;
const STROKE_WIDTH = 6;
const TEXT_OFFSET = 45;
const WIND_ANGLES = Array.from({ length: 16 }, (_, i) => i * 22.5);

const WindCompass: React.FC<WindCompassProps> = ({ windDirection }) => {
  const angleRad = (windDirection - 90) * (Math.PI / 180);
  const handleX = Math.cos(angleRad) * HANDLE_LENGTH;
  const handleY = Math.sin(angleRad) * HANDLE_LENGTH;
  const viewBoxSize = 2 * (COMPASS_RADIUS + STROKE_WIDTH);
  const viewBoxOrigin = -(COMPASS_RADIUS + STROKE_WIDTH);

  return (
    <svg
      className="wind-compass"
      width={viewBoxSize}
      height={viewBoxSize}
      viewBox={`${viewBoxOrigin} ${viewBoxOrigin} ${viewBoxSize} ${viewBoxSize}`}
      role="img"
      aria-label={`Wind direction: ${windDirection} degrees`}
    >
      <circle
        cx="0"
        cy="0"
        r={COMPASS_RADIUS + STROKE_WIDTH / 2}
        fill="transparent"
        stroke="grey"
        strokeWidth={STROKE_WIDTH}
      />
      <circle
        cx="0"
        cy="0"
        r={COMPASS_RADIUS}
        fill="black"
        stroke="#fff"
        strokeWidth="2"
      />

      {WIND_ANGLES.map((angle) => {
        const rad = angle * (Math.PI / 180);
        const isCardinal = angle % 90 === 0;
        const innerR = COMPASS_RADIUS - (isCardinal ? 14 : 8);
        return (
          <line
            key={angle}
            x1={Math.cos(rad) * innerR}
            y1={Math.sin(rad) * innerR}
            x2={Math.cos(rad) * COMPASS_RADIUS}
            y2={Math.sin(rad) * COMPASS_RADIUS}
            stroke="grey"
            strokeWidth={isCardinal ? 1.5 : 0.75}
          />
        );
      })}

      <line
        x1="0"
        y1="0"
        x2={handleX}
        y2={handleY}
        stroke="#fff"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle cx={handleX} cy={handleY} r="4" fill="red" />
      <circle cx="0" cy="0" r="3" fill="white" opacity="0.6" />

      {(["N", "S", "E", "W"] as const).map((dir) => {
        const x = dir === "E" ? TEXT_OFFSET : dir === "W" ? -TEXT_OFFSET : 0;
        const y =
          dir === "S" ? TEXT_OFFSET + 5 : dir === "N" ? -TEXT_OFFSET + 5 : 5;
        return (
          <text
            key={dir}
            x={x}
            y={y}
            textAnchor="middle"
            fill="grey"
            fontSize="11"
          >
            {dir}
          </text>
        );
      })}
    </svg>
  );
};

export default WindCompass;
