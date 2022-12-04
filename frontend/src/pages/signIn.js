import React from "react";
import './signIn.css';
import {useNavigate} from "react-router-dom";


class signIn extends React.Component {
    constructor() {
        super();
    }

    navigate = useNavigate();

    navigate_login = ()=>{
        this.navigate('/search')
    }

    render() {
         return (
    <div className="App">
      <div className="signin-container">
        <h1>Sign In</h1>
        <div className="input-container">
          <label>Username</label>
          <input type="text"
          onChange={(e) => sessionStorage.setItem("user",e.target.value)}
          />
          </div>
          <div className="input-container">

          <label>Password </label>
          <input type="password"
           onChange={(e) => sessionStorage.setItem("password",e.target.value)}
            />
            </div>


        <button className={"button"} onClick={this.onClick}>Sign In</button>
      </div>
    </div>
  );
    }

    onClick = async (event)=> {
        event.preventDefault();

        let jsonData = {
            user: sessionStorage.getItem("user"),
            password: sessionStorage.getItem("password")
        }

        const response = await fetch('http://127.0.0.1:5000/login', {
                method: 'POST',
                body: JSON.stringify(jsonData)
                });

        const json = await response.json();
        console.log(json)

        if (json.response){
            this.navigate_login(); //navigate to a new page
        }

        return json;

    }

}

export default signIn;