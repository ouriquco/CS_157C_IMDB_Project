import React from "react";
import './signUp.css';

class SignUp extends React.Component {
    constructor() {
        super();
        this.state = {
            email: '',
            user: '',
            password: '',
            confirm_password: ''
        }
    }

    render() {
        const { email,user, password, confirm_password } = this.state;
        return (
            <div className="App">
            <form onSubmit={this.onSubmit} className="signin-container">
                <h1>Sign Up</h1>
    
                <div className="input-container">
                    <label>Email </label>
                    <input

                        type="email"
                        value={email}
                        onChange={e => this.setState({ email: e.target.value })}
                    />
                </div>
                <div className="input-container">
                    <label>Username </label>
                    <input

                        type="text"
                        value={user}
                        onChange={e => this.setState({ user: e.target.value })}
                    />
                </div>
                <div className="input-container">
                    <label>Password </label>
                    <input
                        type="password"
                        value={password}
                        onChange={e => this.setState({ password: e.target.value })}
                    />
                </div>
                <div className="input-container">
                    <label>Confirm Password </label>
                    <input
                        type="password"
                        value={confirm_password}
                        onChange={e => this.setState({ confirm_password: e.target.value })}
                    />
                </div>
                <div>
                <button className="button">Sign Up</button>
                </div>
            </form>
            </div>
        )
    }

    validateForm = () => {
        const { email, user, password, confirm_password } = this.state;

        let status = true;
        if (email.length === 0) {
            status = false;
        }
        if (password.length === 0) {
            status = false;
        }
        if (user.length === 0) {
            status = false;
        }
        if (confirm_password.length === 0) {
            status = false;
        }
        if(password !== confirm_password){
            status = false;
        }
        return status;
    }

    onSubmit = async(e) => {
        e.preventDefault();
        const validationStatus = this.validateForm();
        if (validationStatus === false) {
            alert('Please fill all the required fields');
        }
        else {
            const response = await fetch('http://127.0.0.1:5000/registration', {
                method: 'POST',
                body: JSON.stringify(this.state)
            });

            const json = await response.json();
            console.log(json);
        }
    }
}

export default SignUp;