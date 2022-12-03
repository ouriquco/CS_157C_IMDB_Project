import React from "react";
import './AddMovie.css';

class AddMovie extends React.Component {
    constructor() {
        super();
    }
    render() {
        return (
   <div className="App">
     <div className="info-container">
       <h1>Add a movie</h1>
       <div className="input-container">
         <label>Movie Title</label>
         <input type="text"
         onChange={(e) => sessionStorage.setItem("MovieTitle",e.target.value)}
         />
         </div>

        <div className="input-container">
         <label>Plot </label>
         <input type="text"
          onChange={(e) => sessionStorage.setItem("Plot",e.target.value)}
           />
           </div>

        <div className="input-container">
        <label>Year Released </label>
         <input type="text"
          onChange={(e) => sessionStorage.setItem("Published",e.target.value)}
           />
             </div>
        
        <div className="input-container">
        <label> Genre </label>
         <input type = "text"
           onChange={(e) => sessionStorage.setItem("Genre",e.target.value)}
           />
             </div>


        <button className={"button"} onClick={this.onClick}>Add Movie</button>
     </div>
   </div>
 );
   }

   onClick = async (event)=> {
       event.preventDefault();

       let jsonData = {
           MovieTitle: sessionStorage.getItem("MovieTitle"),
           Plot: sessionStorage.getItem("Plot"),
           Published: sessionStorage.getItem("Published"),
           Genre: sessionStorage.getItem("Genre")

       }

       const response = await fetch('http://127.0.0.1:5000/AddMovie', {
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

export default AddMovie;