// SearchBox.tsx
import React, { useState, KeyboardEvent } from "react";

interface SearchBoxProps {
  onSearch: (query: string) => void;
}

const SearchBox: React.FC<SearchBoxProps> = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSearch = (evt: KeyboardEvent<HTMLInputElement>) => {
    if (evt.key === "Enter") {
      onSearch(query);
      setQuery("");
    }
  };

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
