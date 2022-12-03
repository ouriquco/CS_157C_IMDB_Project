import React from "react";

class addRating extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            rating: '',
            comment: ''
        }
    }

  validateRating = () => {
        const {rating} = this.state;

        let status = true;
        if (rating.length === 0) {
            status = false;
        }
        return status;
    }

    validateComment = () => {
        const {comment} = this.state;

        let status = true;
        if (comment.length === 0) {
            status = false;
        }
        return status;
    }

    onComment = async(e) => {
        e.preventDefault();
        const validationStatus = this.validateComment();
        if (validationStatus === false) {
            alert('Please fill all the required fields');
        }
        else {
            const response = await fetch('http://127.0.0.1:5000/add_rating', {
                method: 'POST',
                body: JSON.stringify(this.state)
            });

            const json = await response.json();
            console.log(json);
        }
    }

    onRating = async(e) => {
        e.preventDefault();
        const validationStatus = this.validateRating();
        if (validationStatus === false) {
            alert('Please fill all the required fields');
        }
        else {
            const response = await fetch('http://127.0.0.1:5000/add_rating', {
                method: 'POST',
                body: JSON.stringify(this.state)
            });

            const json = await response.json();
            console.log(json);
        }
    }

  render() {
        const {rating, comment} = this.state;
    return (
        <div>
            <h1>Add User Rating/Comment</h1>
      <form className={"signin-container"}>
        <div>
          <label>
          Rating:
          <input type="number" value={rating} onChange={e => this.setState({ rating: e.target.value })} />
        </label>
            <div><button onClick={this.onRating} className={"button_rating"}>Submit Rating</button></div>
        </div>
          <br/>
          <br/>
          <div>
          <label>
              Rating Description:
                <input className={"textbox"} type={"text"} value={comment} onChange={e => this.setState({ comment: e.target.value })}/>
          </label>
          </div>
          <div><button onClick={this.onComment} className={"button_rating"}>Submit Comment</button></div>
      </form>
    </div>
    );
  }

}

export default addRating;