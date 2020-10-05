// ********************************************************************************************************************
// NewField.js - Currently unused.  Will allow users to add new types into the Budget with custom names and descriptions.
// ********************************************************************************************************************

// Dependencies
import React, { Component } from 'react';

class NewField extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      description: '',
      value: '',
    }
    this.handleChange     = this.handleChange.bind(this);
    this.handleAddNew     = this.handleAddNew.bind(this);
    this.handleSaveNew    = this.handleSaveNew.bind(this);
    this.handleCancelNew  = this.handleCancelNew.bind(this);
  }

  handleChange(evt) {
    this.setState({[evt.target.name]: evt.target.value});
  }

  handleAddNew(evt) {
    evt.preventDefault();
    this.props.toggleAddNewField();
  }

  handleSaveNew(evt) {
    // console.log("Does this fire?")
    evt.preventDefault();
    let newFieldInfo =  {
      title: this.state.name, 
      description: this.state.description, 
      value: this.state.value
    }
    this.props.sendNewFieldInfo(newFieldInfo);
    this.props.toggleAddNewField();
    this.setState({ name: '', description: '', value: '' })
  }

  handleCancelNew(evt) {
    evt.preventDefault();
    this.props.toggleAddNewField();
  }

  render() {
    return(
      <div>
        {this.props.addingNewField 
        ? 
        // <li className="list-group-item">
          <form>
            <div className="form-group row">

              <div className="col-sm-3">
                <input 
                  type="text" 
                  name="name"
                  value={this.state.name}
                  onChange={this.handleChange} 
                  className="form-control" 
                  placeholder="Name of Item" 
                />
              </div>

              <div className="col-sm-6">
                <input 
                  type="text" 
                  name="description"
                  value={this.state.description}
                  onChange={this.handleChange} 
                  className="form-control" 
                  placeholder="Description" 
                />
              </div>

              <div className="col-sm-3">
                <input 
                  type="number" 
                  name="value"
                  value={this.state.value}
                  onChange={this.handleChange}
                  className="form-control" 
                  placeholder="Amount" 
                />
              </div>

            </div>
            <button type="button" className="btn btn-info" onClick={this.handleSaveNew}>Save Item</button>
            <button type="button" className="btn btn-danger" onClick={this.handleCancelNew}>Cancel</button>

          </form>
        // </li> 
        :  
        <div>
          <button type="button" className="btn btn-info" onClick={this.handleAddNew}>Add Item</button>
        </div>}
      </div>
    )
  }
}

export default NewField;