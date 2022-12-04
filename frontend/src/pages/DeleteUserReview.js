import React from "react";
import './DeleteUserReview.css';
import {useNavigate} from "react-router-dom";


class DeleteUserReview extends React.Component {
    constructor() {
        super();
    }

    // navigate = useNavigate();

    // navigate_login = ()=>{
    //     this.navigate('/search')
    // }

    render() {
         return (
    <div className="App">
      <div className="signin-container">
        <h1>Delete User Review by word or Phrase</h1>
        <div className="input-container">
          <label>Text</label>
          <input type="text"
          onChange={(e) => sessionStorage.setItem("text",e.target.value)}
          />
          </div>
         

        <button className={"button"} onClick={this.onClick}>Delete Content</button>
      </div>
    </div>
  );
    }

    onClick = async (event)=> {
        event.preventDefault();

        let jsonData = {
            email: sessionStorage.getItem("text"),
        }

        const response = await fetch('http://127.0.0.1:5000/DeleteUserReview', {
                method: 'POST',
                body: JSON.stringify(jsonData)
                });

        const json = await response.json();
        console.log(json)

        // if (json.response){
        //     this.navigate_login(); //navigate to a new page
        // }

        return json;

    }

}

export default DeleteUserReview