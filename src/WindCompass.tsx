import React from "react";

interface WindCompassProps {
  windDirection: number;
}

const WindCompass: React.FC<WindCompassProps> = ({ windDirection }) => {
  const compassRadius = 60; // Adjust the compass radius here
  const handleLength = 55; // Adjust the handle length here
  const handleX =
    Math.cos((windDirection - 90) * (Math.PI / 180)) * handleLength;
  const handleY =
    Math.sin((windDirection - 90) * (Math.PI / 180)) * handleLength;

  const textOffset = 45;
  const cardinalDirectionFontSize = 14; // Adjust the font size here
  const outerCircleStrokeWidth = 8; // Adjust the stroke width of the outer circle here

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
      {/* Compass circle */}
      <circle
        cx="0"
        cy="0"
        r={compassRadius}
        fill="black"
        stroke="#fff"
        strokeWidth="2"
      />
      {/* Outer circle */}
      <circle
        cx="0"
        cy="0"
        r={compassRadius + outerCircleStrokeWidth / 2} // Adjust the outer circle radius
        fill="transparent"
        strokeWidth={outerCircleStrokeWidth}
        stroke="grey"
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
    </svg>
  );
};

export default WindCompass;
