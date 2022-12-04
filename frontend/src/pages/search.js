import React, { useState } from "react";
import "./search.css";

function Search() {
  const FILTER_IMBD = "imbd";
  const FILTER_ACTOR = "cast";
  const FILTER_PLOT = "plot";
  const FILTER_GENRE = "genre";
  const FILTER_TYPE = "type";
  const FILTER_DIRECTOR = "director";
  const FILTER_TITLE = "title";
  const FILTER_TOMATO = "tomato";
  const FILTER_URating = "user_rating"

  const [query, setQuery] = useState("");
  const [filterType, setFilterType] = useState("");
  const [searchData, setSearchData] = useState([]);

  const validateForm = () => {
    let status = true;
    if (filterType.length === 0) {
      status = false;
    }
    if (query.length === 0) {
      status = false;
    }
    return status;
  };

  const onQueryClick = async (event) => {
    event.preventDefault();

    let data = [];
    const validationStatus = validateForm();
    if (validationStatus === false) {
      alert("Please select a option to search by");
    } else {
      const response = await fetch("http://127.0.0.1:5000/search", {
        method: "POST",
        body: JSON.stringify({ filterType: filterType, query: query }),
      });

      data = await response.json();
    }

    setSearchData(data);

    return data;
  };

  const changeFilter = (event) => {
    setFilterType(event.target.value);
  };

  const moviesRequested = searchData.filter((movie) => {
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
      case FILTER_IMBD:
        return movie.rated.toLowerCase().includes(query.toLowerCase());
      case FILTER_TYPE:
        return movie.type.toLowerCase().includes(query.toLowerCase());
      case FILTER_URating:
        return movie.user_rating.toLowerCase().includes(query.toLowerCase);
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
        <input type="radio" value={FILTER_IMBD} name="filter" /> IMBD Rating
        <input type="radio" value={FILTER_TOMATO} name="filter" /> Tomato Meter
        <input type="radio" value={FILTER_URating} name="filter" /> User Rating
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
      <button
        onClick={(e) => {
          onQueryClick(e);
        }}
        className={"button"}>
        Enter
      </button>
      <div className="moviesList">
        {moviesRequested.map((movie, i) => (
          <a href={"/add_rating"}><h3 key={i} onClick={()=>{sessionStorage.setItem("movie_id",movie._id)}}>{movie.title}</h3></a>
        ))}
      </div>
    </div>
  );
}

export default Search;
