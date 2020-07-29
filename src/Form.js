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
    // console.log(this.props.boxName);
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
                  Description here
                </div>
              </div>



              {/* <div class="input-group mb-3">
                <div class="input-group-prepend">
                  <span class="input-group-text">$</span>
                  <span class="input-group-text">0.00</span>
                </div>
                <input type="text" class="form-control" aria-label="Amount (to the nearest dollar)">
              </div>

              <div class="input-group">
                <input type="text" class="form-control" aria-label="Amount (to the nearest dollar)">
                <div class="input-group-append">
                  <span class="input-group-text">$</span>
                  <span class="input-group-text">0.00</span>
                </div>
              </div> */}



              <div className="col-sm-3">
                <div className="input-group mb-3">
                  <div class="input-group-prepend">
                    <div class="input-group-text" id="inputGroup-sizing-sm">$</div>
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