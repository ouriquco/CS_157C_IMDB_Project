import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { data } from "../data.js";
import Search from "./search.js";
import "./search.css";

function DropDown() {
  const navigate = useNavigate();

  return (
    <div>
      <div>
        <h4>How do you want to search the movies database?</h4>
        <button onClick={() => navigate("/search")}>Movie Title</button>
        <button onClick={() => Search()}>Movie Director</button>
      </div>
    </div>
  );
}

// const Search = () => {
//   const [query, setQuery] = useState("");

//   const moviesRequested = data.filter((movie) => {
//     if (query.length === 0) return [];
//     return movie.title.toLowerCase().includes(query.toLowerCase());
//   });

//   return (
//     <div className="app">
//       <h1>Movies Database Search</h1>
//       <input
//         type="text"
//         placeholder="Search for a movie..."
//         className="search"
//         onChange={(e) => {
//           setQuery(e.target.value);
//         }}
//       />
//       <div className="moviesList">
//         {moviesRequested.map((movie, index) => (
//           <h3 key={index}>{movie.title}</h3>
//         ))}
//       </div>
//     </div>
//   );
// };

export default DropDown;
