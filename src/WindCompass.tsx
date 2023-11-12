import React from "react";

// Define the properties expected by the WindCompass component
interface WindCompassProps {
  windDirection: number;
}

const WindCompass: React.FC<WindCompassProps> = ({ windDirection }) => {
  // Constants for configuring the appearance of the compass
  const compassRadius = 60; // Adjust the compass radius here
  const handleLength = 55; // Adjust the handle length here
  const handleX =
    Math.cos((windDirection - 90) * (Math.PI / 180)) * handleLength;
  const handleY =
    Math.sin((windDirection - 90) * (Math.PI / 180)) * handleLength;

  const textOffset = 45;
  const cardinalDirectionFontSize = 14; // Adjust the font size here
  const outerCircleStrokeWidth = 8; // Adjust the stroke width of the outer circle here

  // Calculate angles for the 16 wind directions (in degrees)
  const windAngles = [
    0, 22.5, 45, 67.5, 90, 112.5, 135, 157.5, 180, 202.5, 225, 247.5, 270,
    292.5, 315, 337.5,
  ];

  // Render the WindCompass component as an SVG
  return (
    <svg
      className="wind-compass"
      width={2 * compassRadius + 2 * outerCircleStrokeWidth}
      height={2 * compassRadius + 2 * outerCircleStrokeWidth}
      viewBox={`${-compassRadius - outerCircleStrokeWidth} ${
        -compassRadius - outerCircleStrokeWidth
      } ${2 * compassRadius + 2 * outerCircleStrokeWidth} ${
        2 * compassRadius + 2 * outerCircleStrokeWidth
      }`}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Outer circle */}
      <circle
        cx="0"
        cy="0"
        r={compassRadius + outerCircleStrokeWidth / 2} // Adjust the outer circle radius
        fill="transparent"
        strokeWidth={outerCircleStrokeWidth}
        stroke="grey"
      />
      {/* Compass circle */}
      <circle
        cx="0"
        cy="0"
        r={compassRadius}
        fill="black"
        stroke="#fff"
        strokeWidth="2"
      />
      {/* Handle with small red circle at the end */}
      <line
        x1="0"
        y1="0"
        x2={handleX}
        y2={handleY}
        stroke="#fff"
        strokeWidth="2"
      />
      <circle cx={handleX} cy={handleY} r="3" fill="red" />{" "}
      {/* Adjust the size of the red circle */}
      {/* Add cardinal directions */}
      <text
        x="0"
        y={-textOffset}
        textAnchor="middle"
        fill="grey" // Adjust the color here
        fontSize={cardinalDirectionFontSize} // Use the updated font size here
      >
        N
      </text>
      <text
        x="0"
        y={textOffset}
        textAnchor="middle"
        fill="grey" // Adjust the color here
        fontSize={cardinalDirectionFontSize} // Use the updated font size here
      >
        S
      </text>
      <text
        x={textOffset}
        y="5"
        textAnchor="middle"
        fill="grey" // Adjust the color here
        fontSize={cardinalDirectionFontSize} // Use the updated font size here
      >
        E
      </text>
      <text
        x={-textOffset}
        y="5"
        textAnchor="middle"
        fill="grey" // Adjust the color here
        fontSize={cardinalDirectionFontSize} // Use the updated font size here
      >
        W
      </text>
      {/* Add small lines for 16 wind directions */}
      {windAngles.map((angle) => {
        const angleInRadians = angle * (Math.PI / 180);
        const lineX1 = Math.cos(angleInRadians) * (compassRadius - 12); // Adjust the length of the lines
        const lineY1 = Math.sin(angleInRadians) * (compassRadius - 12); // Adjust the length of the lines
        const lineX2 = Math.cos(angleInRadians) * compassRadius;
        const lineY2 = Math.sin(angleInRadians) * compassRadius;
        return (
          <line
            key={angle}
            x1={lineX1}
            y1={lineY1}
            x2={lineX2}
            y2={lineY2}
            stroke="grey"
            strokeWidth="1"
          />
        );
      })}
    </svg>
  );
};

export default WindCompass;
