import React, { useState, KeyboardEvent } from "react";

interface SearchBoxProps {
  onSearch: (query: string) => void;
  isLoading?: boolean;
}

const SearchBox: React.FC<SearchBoxProps> = ({
  onSearch,
  isLoading = false,
}) => {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    const trimmed = query.trim();
    if (trimmed) {
      onSearch(trimmed);
      setQuery("");
    }
  };

  const handleKeyDown = (evt: KeyboardEvent<HTMLInputElement>) => {
    if (evt.key === "Enter") handleSearch();
  };

  return (
    <div className="search-box">
      <input
        type="text"
        className="search-bar"
        placeholder="Search a location..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={isLoading}
        aria-label="Search for a city"
      />
    </div>
  );
};

export default SearchBox;
