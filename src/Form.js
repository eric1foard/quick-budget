import React, { Component } from 'react';

import './Form.css';

class Form extends Component {

  constructor(props) {
    super(props);
    this.state = {
      num: "0"
    }
    this.handleChange = this.handleChange.bind(this);
    this.capitalizeFirstLetter = this.capitalizeFirstLetter.bind(this);
  }

  handleChange(evt) {
    this.setState({ [evt.target.name]: evt.target.value });
    this.props.updateBox(evt.target.name, evt.target.value);
  }

  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  render() {
    return(
      <ul className="list-group list-group-flush">
        <li className="list-group-item">
          <form>

            <div className="form-group row">

              <div className="col-sm-9">
                <label htmlFor={this.props.formLabel} className="col-form-label label-title">
                  {this.props.formLabel.toUpperCase()}
                </label>
                <div className="label-description">
                  {this.props.formDescription}
                </div>
              </div>

              <div className="col-sm-3">
                <div className="input-group mb-3">
                  <div className="input-group-prepend">
                    <div className="input-group-text" id="inputGroup-sizing-sm">$</div>
                  </div>
                  <input 
                    type="number" 
                    name={this.props.formLabel}
                    id={this.props.formLabel}
                    value={this.state.value}
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