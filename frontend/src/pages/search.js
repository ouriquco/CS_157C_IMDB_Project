import React, { useState } from "react";
import { data } from "../data.js";
import "./search.css";

function Search() {
  const [query, setQuery] = useState("");

  const moviesRequested = data.filter((movie) => {
    if (query.length == 0) return [];
    return movie.title.toLowerCase().includes(query.toLowerCase());
  });

  return (
    <div className="app">
      <h1>Movies Database Search</h1>
      <input
        type="text"
        placeholder="Search for a movie..."
        className="search"
        onChange={(e) => {
          setQuery(e.target.value);
        }}
      />
      <div className="moviesList">
        {moviesRequested.map((movie, index) => (
          <h3 key={index}>{movie.title}</h3>
        ))}
      </div>
    </div>
  );
}

export default Search;
