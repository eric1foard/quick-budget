import React, { Component } from 'react';

class NewField extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      description: '',
      amount: '',
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleAddNew = this.handleAddNew.bind(this);
    this.handleSaveNew = this.handleSaveNew.bind(this);
  }

  handleChange(evt) {
    this.setState({[evt.target.name]: evt.target.value});
  }

  handleAddNew(evt) {
    evt.preventDefault();
    this.props.toggleAddNewField();
  }

  handleSaveNew(evt) {
    evt.preventDefault();
    this.props.sendNewFieldInfo({ fieldTitle: this.state.name, 
                                  fieldDescription: this.state.description, 
                                  value: this.state.amount
                                });
  }

  render() {
    return(
      <div>
        {this.props.addingNewField 
        ? 
        <li className="list-group-item">
          <form>
            <div className="form-group row">

              <div className="col-sm-3">
                <input 
                  type="text" 
                  name="name"
                  onChange={this.handleChange} 
                  className="form-control" 
                  placeholder="Name of Item" 
                />
              </div>

              <div className="col-sm-6">
                <input 
                  type="text" 
                  name="description"
                  onChange={this.handleChange} 
                  className="form-control" 
                  placeholder="Description" 
                />
              </div>

              <div className="col-sm-3">
                <input 
                  type="number" 
                  name="amount"
                  onChange={this.handleChange}
                  className="form-control" 
                  placeholder="Amount" 
                />
              </div>

            </div>
            <button type="button" class="btn btn-info" onClick={this.handleSaveNew}>Save Item</button>
          </form>
        </li> 
        :  
        <div className="list-group-item">
          <button type="button" class="btn btn-info" onClick={this.handleAddNew}>Add Item</button>
        </div>}
      </div>
    )
  }
}

export default NewField;