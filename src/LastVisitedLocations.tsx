import React from "react";

interface LocationData {
  name: string;
  country: string;
}

interface LastVisitedLocationsProps {
  locations: LocationData[];
}

const LastVisitedLocations: React.FC<LastVisitedLocationsProps> = ({
  locations,
}) => {
  return (
    <div className="last-visited-locations">
      <h2>Last 4 Visited Locations:</h2>
      <ul>
        {locations.map((location, index) => (
          <li key={index}>
            {location.name}, {location.country}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LastVisitedLocations;
