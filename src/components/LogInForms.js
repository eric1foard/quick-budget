import React, { Component } from 'react';

class LogInForms extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    }
    this.handleChange     = this.handleChange.bind(this);
    // this.handleSaveNew    = this.handleSaveNew.bind(this);
  }

  handleChange(evt) {
    this.setState({[evt.target.name]: evt.target.value});
  }

  // handleSaveNew(evt) {
  //   console.log("Does this fire?")
  //   evt.preventDefault();
  //   let newFieldInfo =  {
  //     title: this.state.name, 
  //     description: this.state.description, 
  //     value: this.state.value
  //   }
  //   this.props.sendNewFieldInfo(newFieldInfo);
  //   this.props.toggleAddNewField();
  //   this.setState({ name: '', description: '', value: '' })
  // }

  render() {
    return(
      
      <form>
        <div className="form-group">

          <div className="row">
            <div className="col-sm-12">
              <div className="card login-label">

                <label htmlFor="username">Username</label>
                <input 
                  type="text" 
                  name="username"
                  value={this.state.username}
                  onChange={this.handleChange} 
                  className="form-control login-form" 
                  placeholder="Enter Username Here" 
                />

              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-sm-12">
              <div className="card login-label">

                <label htmlFor="password">Password</label>
                <input 
                  type="text" 
                  name="password"
                  value={this.state.password}
                  onChange={this.handleChange} 
                  className="form-control login-form" 
                  placeholder="Enter Password Here"
                />

              </div>
            </div>
          </div>

        </div>
      </form>
    )
  }
}

export default LogInForms;