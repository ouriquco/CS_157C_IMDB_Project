import React from "react";
import './DeleteMovie.css';

class DeleteMovie extends React.Component {
    constructor() {
        super();
    }


    render() {
         return (
    <div className="App">
      <div className="delete-container">
        <h1>Choose Movie to Delete</h1>
        <div className="input-container">
          <label>Movie Title</label>
          <input type="text"
          onChange={(e) => sessionStorage.setItem("MovieTitle",e.target.value)}
          />
          </div>
         


        <button className={"button"} onClick={this.onClick}>Delete Movie</button>
      </div>
    </div>
  );
    }

    onClick = async (event)=> {
        event.preventDefault();

        let jsonData = {
            MovieTitle: sessionStorage.getItem("MovieTitle"),
        }

        const response = await fetch('http://127.0.0.1:5000/DeleteMovie', {
                method: 'POST',
                body: JSON.stringify(jsonData)
                });

        const json = await response.json();
        console.log(json)

        if (json.response){
            window.location.pathname = "/"; //navigate to a new page
        }

        return json;

    }

}

export default DeleteMovie;