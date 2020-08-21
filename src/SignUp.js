import React, { Component } from 'react';

import './App.css';

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user_name: '',
      password: '',
    }
    this.handleChange     = this.handleChange.bind(this);
    this.submitSignUp     = this.submitSignUp.bind(this);
  }

  handleChange(evt) {
    this.setState({[evt.target.name]: evt.target.value});
  }

  submitSignUp(evt) {
    evt.preventDefault();
    console.log(this.state.user_name, this.state.password);
    fetch('http://localhost:3001/api/all', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user_name: this.state.user_name,
        password: this.state.password
      })
    }).then((response) => response.json())
      .then((result) => {
        if (result.status === 'success') {
          this.props.history.push("/budget");
        } else {
          alert('Sorry!  Un-authenticated User')
        }
      })
  }

  render() {
    return(
      <div>
        <form>
          <div className="form-group row">

            <div className="col-sm-3">
              <input 
                type="text" 
                name="user_name"
                value={this.state.user_name}
                onChange={this.handleChange} 
                className="form-control" 
                placeholder="User Name" 
              />
            </div>

            <div className="col-sm-3">
              <input 
                type="text" 
                name="password"
                value={this.state.password}
                onChange={this.handleChange} 
                className="form-control" 
                placeholder="Password" 
              />
            </div>

          </div>

          <button type="button" className="btn btn-info" onClick={this.submitSignUp}>Save Item</button>
        </form>
      </div>
    )
  }
}

export default SignUp;