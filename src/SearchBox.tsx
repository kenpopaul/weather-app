// SearchBox.tsx
import React, { useState, KeyboardEvent } from "react";

// Define the interface for the props received by the SearchBox component
interface SearchBoxProps {
  // Callback function to be called when a search is performed
  onSearch: (query: string) => void;
}

const SearchBox: React.FC<SearchBoxProps> = ({ onSearch }) => {
  // State hook to manage the query entered by the user
  const [query, setQuery] = useState("");

  // Event handler for handling search when Enter key is pressed
  const handleSearch = (evt: KeyboardEvent<HTMLInputElement>) => {
    if (evt.key === "Enter") {
      onSearch(query);
      setQuery("");
    }
  };

  // Render the SearchBox component with an input field
  return (
    <div className="search-box">
      <input
        type="text"
        className="search-bar"
        placeholder="Search a location..."
        onChange={(e) => setQuery(e.target.value)}
        value={query}
        onKeyDown={handleSearch}
      />
    </div>
  );
};

export default SearchBox;
