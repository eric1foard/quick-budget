import React, { Component } from 'react';

import './Form.css';

class Form extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  // When a user types into the form, the name and number are sent to Box,
  //  ...which then passes the info to App. The field's value is updated in state,
  //  ...and the totals and summary are updated.
  handleChange(evt) {
    this.props.updateBox(evt.target.name, evt.target.value);
  }

  render() {
    return (
      <ul className="list-group list-group-flush">
        <li className="list-group-item">
          <form>
            
            <div className="form-group row">
              {/* Form's title, in upper case */}
              <div className="col-sm-9">
                <label htmlFor={this.props.formLabel} className="col-form-label label-title">
                  {this.props.formLabel.toUpperCase()}
                </label>
                {/* Underneath the title, a description */}
                <div className="label-description">
                  {this.props.formDescription}
                </div>
              </div>

              {/* On the right side, the input for users to put $ amounts */}
              <div className="col-sm-3">
                <div className="input-group mb-3">
                  <div className="input-group-prepend">
                    <div className="input-group-text" id="inputGroup-sizing-sm">$</div>
                  </div>
                  <input 
                    type="number" 
                    name={this.props.formLabel}
                    id={this.props.formLabel}
                    onChange={this.handleChange}
                    className="form-control"
                  />
                </div>
              </div>
            
            </div>
          </form>
        </li>
      </ul>
    )
  }
}

export default Form;