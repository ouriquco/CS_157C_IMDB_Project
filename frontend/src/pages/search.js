import React, { useState } from "react";
import { data } from "../data.js";
import "./search.css";

function Search() {
  const FILTER_RATING = "rating";
  const FILTER_ACTOR = "actor";
  const FILTER_PLOT = "plot";
  const FILTER_GENRE = "genere";
  const FILTER_TYPE = "type";
  const FILTER_DIRECTOR = "director";
  const FILTER_TITLE = "title";

  const [query, setQuery] = useState("");
  const [filterType, setFilterType] = useState(FILTER_TITLE);

  const changeFilter = (event) => {
    setFilterType(event.target.value);
  };

  const moviesRequested = data.filter((movie) => {
    if (query.length === 0) return [];
    switch (filterType) {
      case FILTER_TITLE:
        return movie.title.toLowerCase().includes(query.toLowerCase());
      case FILTER_DIRECTOR:
        return movie.directors.some((e) => {
          return e.toLowerCase().includes(query.toLowerCase());
        });
      case FILTER_ACTOR:
        return movie.cast.some((e) => {
          return e.toLowerCase().includes(query.toLowerCase());
        });
      case FILTER_PLOT:
        return movie.plot.toLowerCase().includes(query.toLowerCase());
      case FILTER_GENRE:
        return movie.genres.some((e) => {
          return e.toLowerCase().includes(query.toLowerCase());
        });
      case FILTER_RATING:
        return movie.rated.toLowerCase().includes(query.toLowerCase());
      case FILTER_TYPE:
        return movie.type.toLowerCase().includes(query.toLowerCase());
      default:
        return movie.title.toLowerCase().includes(query.toLowerCase());
    }
  });

  return (
    <div className="app">
      <h1>Search By</h1>
      <div onChange={changeFilter}>
        <input type="radio" value={FILTER_TITLE} name="filter" /> Title
        <input type="radio" value={FILTER_DIRECTOR} name="filter" /> Director
        <input type="radio" value={FILTER_ACTOR} name="filter" /> Actor
        <input type="radio" value={FILTER_PLOT} name="filter" /> Plot
        <input type="radio" value={FILTER_GENRE} name="filter" /> Genre
        <input type="radio" value={FILTER_RATING} name="filter" /> Rating
        <input type="radio" value={FILTER_TYPE} name="filter" /> Type
      </div>
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
